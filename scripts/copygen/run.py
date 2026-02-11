#!/usr/bin/env python3
"""Generate CECE LAW copy outputs with strict 3-part contract."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
from pathlib import Path
from typing import Dict

try:
    import yaml
except Exception:  # pragma: no cover
    yaml = None

CONTRACT_HEADERS = ["INSERT BLOCK", "CHANGELOG ENTRY", "REUSE TAGS"]
ROOT = Path(__file__).resolve().parents[2]


class ContractError(RuntimeError):
    """Raised when model output violates required contract."""


def load_request(path: Path) -> Dict:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() in {".yml", ".yaml"}:
        if yaml is None:
            raise RuntimeError("PyYAML is required for YAML request files.")
        return yaml.safe_load(text)
    return json.loads(text)


def load_inputs_text() -> str:
    inputs_dir = ROOT / "inputs"
    chunks = []
    if not inputs_dir.exists():
        return ""
    for p in sorted(inputs_dir.glob("*")):
        if p.is_file():
            chunks.append(f"## {p.name}\n{p.read_text(encoding='utf-8')}\n")
    return "\n".join(chunks)


def build_user_prompt(prompt_text: str, request_obj: Dict, inputs_text: str) -> str:
    payload = request_obj.get("request_payload", {})
    return (
        f"{prompt_text}\n\n"
        f"REQUEST JSON:\n{json.dumps(payload, indent=2)}\n\n"
        f"TARGET REF: {request_obj.get('target_ref', '[FILL-IN]')}\n"
        f"TIER: {request_obj.get('tier', '[FILL-IN]')}\n"
        f"PAGE_OR_MODULE: {request_obj.get('page_or_module', '[FILL-IN]')}\n\n"
        f"INPUTS FOLDER SNAPSHOT:\n{inputs_text}\n"
    )


def call_gemini(system_instruction: str, user_prompt: str, model: str, temperature: float) -> str:
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    response = client.models.generate_content(
        model=model,
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=temperature,
        ),
    )
    return (response.text or "").strip()


def parse_contract(raw: str) -> Dict[str, str]:
    pattern = re.compile(
        r"\AINSERT BLOCK\s*\n(?P<insert>.*?)\n\s*CHANGELOG ENTRY\s*\n(?P<changelog>.*?)\n\s*REUSE TAGS\s*\n(?P<reuse>.*?)\s*\Z",
        re.DOTALL,
    )
    match = pattern.match(raw.strip())
    if not match:
        raise ContractError(
            "Output must contain ONLY 3 sections in order: INSERT BLOCK, CHANGELOG ENTRY, REUSE TAGS."
        )

    changelog = match.group("changelog").strip()
    if "\n" in changelog:
        raise ContractError("CHANGELOG ENTRY must be a single line.")

    parsed = {
        "insert": match.group("insert").strip(),
        "changelog": changelog,
        "reuse": match.group("reuse").strip(),
    }
    if not all(parsed.values()):
        raise ContractError("All three sections must contain content.")
    return parsed


def write_outputs(request_obj: Dict, parsed: Dict[str, str]) -> None:
    date = dt.date.today().isoformat()
    tier = (request_obj.get("tier") or "UNTIERED").replace(" ", "_")
    page = (request_obj.get("page_or_module") or "unknown").replace(" ", "_")
    stem = f"{date}__{tier}__{page}".lower()

    out_dir = ROOT / "generated"
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f"{stem}__insert_block.txt").write_text(parsed["insert"] + "\n", encoding="utf-8")
    (out_dir / f"{stem}__changelog.txt").write_text(parsed["changelog"] + "\n", encoding="utf-8")
    (out_dir / f"{stem}__reuse_tags.txt").write_text(parsed["reuse"] + "\n", encoding="utf-8")


def build_mock_response(request_obj: Dict) -> str:
    ref = request_obj.get("target_ref", "T1.HOME.CORE")
    tier = request_obj.get("tier", "T1")
    page = request_obj.get("page_or_module", "homepage")
    return f"""INSERT BLOCK
[PAGE: {page.upper()}]
COPY_REF: {ref}
SEO Title: Criminal Defense Attorney in [City] | CECE LAW
Meta Description: Former Prosecutor criminal defense representation in [City]. Contact CECE LAW for strategic case planning.
H1: Criminal Defense Representation Built for High-Stakes Cases
[SECTION: HERO]
Former Prosecutor perspective. Direct, strategic defense.
[SECTION: PROOF]
PracticePanther-supported intake and communication workflow.
[SECTION: PROCESS]
1) Intake 2) Review 3) Strategy 4) Ongoing preparation
[SECTION: FAQ]
Q1: Is this legal advice?
A1: No. Informational only.
[SECTION: CTA_CLOSE]
Book a confidential consultation.
Microcopy:
- Button labels: Book consultation, Call now
- Form labels: Full name, Phone, Email, Case summary

CHANGELOG ENTRY
v1.0 | {dt.date.today().isoformat()} | Generated {tier} {page} insert block | Support split-screen Squarespace implementation.

REUSE TAGS
MOD.PRACTICE_AREA.HERO
MOD.CTA.CONSULT
MOD.DISCLAIMER.NO_GUARANTEE"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--request", required=True, help="Path to request JSON/YAML file")
    args = parser.parse_args()

    req_path = Path(args.request).resolve()
    request_obj = load_request(req_path)

    prompt_name = request_obj.get("prompt_name", "EXTRACT_PAGE_TO_INSERT_BLOCK")
    prompt_path = ROOT / "prompts" / f"{prompt_name}.txt"
    if not prompt_path.exists():
        print(f"ERROR: Prompt file not found: {prompt_path}", file=sys.stderr)
        return 2

    system_instruction = (ROOT / "prompts" / "system_instructions.txt").read_text(encoding="utf-8")
    prompt_text = prompt_path.read_text(encoding="utf-8")
    inputs_text = load_inputs_text()
    user_prompt = build_user_prompt(prompt_text, request_obj, inputs_text)

    model = request_obj.get("model", "gemini-2.5-pro")
    temperature = float(request_obj.get("temperature", 0.1))

    try:
        if os.getenv("GEMINI_API_KEY"):
            raw = call_gemini(system_instruction, user_prompt, model, temperature)
        elif request_obj.get("use_mock_when_no_api_key", False):
            raw = build_mock_response(request_obj)
        else:
            raise RuntimeError("GEMINI_API_KEY is not set and mock mode is disabled.")

        parsed = parse_contract(raw)
        write_outputs(request_obj, parsed)
        print("copygen completed successfully")
        return 0
    except ContractError as exc:
        print(f"CONTRACT VIOLATION: {exc}", file=sys.stderr)
        return 3
    except Exception as exc:  # noqa: BLE001
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
