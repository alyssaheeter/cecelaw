import os
import time
import json
from google import genai
from google.genai import types

EXPERT_VIDEO_PROMPT = """
You are an expert forensic video analyst and investigator working for the defense of Mr. Carter.
Your task is to analyze the following video segment with absolute objectivity to ensure every single detail of a specific incident is logged to build a strong defense based on facts.
The user firmly believes there is a critical interaction involving Mr. Carter, a man in a wheelchair, and a brick in THIS exact video. You MUST find it. Look extremely closely at the entire frame, frame by frame.

RULES OF ANALYSIS:
1. EXHAUSTIVE OBSERVATION: You must document every single movement or interaction between Mr. Carter, the man in the wheelchair, and the brick. Catch EVERYTHING.
2. NEVER ASSIGN INTENT: Describe only physical motions (e.g., "Subject A's hand made rapid contact", "Subject B raised an arm"). Do not use words like "attacked" or "aggressively".
3. BRICK TRAJECTORY & USAGE: If a brick or similar object is visible, trace its exact location, who is holding it, how it was introduced, any throwing motions, and exactly when/where contact was made.
4. WHEELCHAIR MECHANICS & POSITION: Pay special attention to the man in the wheelchair. Note the wheelchair's exact position, stability, whether it was moving toward or away, and any use of the wheelchair as leverage or a barrier.
5. SELF-DEFENSE INDICATORS: Meticulously log who initiated physical contact, any sudden movements towards Mr. Carter, raised hands, aggressive posturing by the other party BEFORE the brick contact.
6. PRE/POST INCIDENT: Analyze the moments leading up to any physical contact, and the immediate aftermath.
7. CHAIN OF EVIDENCE: Every single claim MUST be cited with the exact video timestamp (HH:MM:SS) and a visual basis description.

Respond ONLY with a JSON array of event objects matching this exact structure:
[
  {
    "start_ts": "HH:MM:SS",
    "end_ts": "HH:MM:SS",
    "relevance_reason": "Specific physical action involving the brick or wheelchair.",
    "category": "incident_core",
    "people_entities": "Mr. Carter, Man in Wheelchair",
    "confidence": "HIGH|MEDIUM|LOW",
    "basis": "Visual confirmation of rapid contact, holding an object, etc.",
    "review_notes": "Lighting, camera angle, obstructions. Wheelchair stationary/moving."
  }
]
"""

def main():
    filepath = r"C:\Users\fcece\Carter\ch24_20250930081500(transcode)(1).mp4"
    if not os.path.exists(filepath):
        print("File not found.")
        return

    os.environ["GOOGLE_CLOUD_PROJECT"] = "cece-law"
    api_key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client()

    print(f"Uploading {filepath}...")
    uploaded_file = client.files.upload(file=filepath)
    
    print("Waiting for processing...")
    while True:
        time.sleep(5)
        f = client.files.get(name=uploaded_file.name)
        if f.state == "ACTIVE":
            print("Ready!")
            break
        elif f.state == "FAILED":
            print("FAILED.")
            return

    print("Analyzing with gemini-2.5-pro (high detail)...")
    response = client.models.generate_content(
        model='gemini-2.5-pro',
        contents=[
            uploaded_file,
            EXPERT_VIDEO_PROMPT
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.1
        )
    )
    
    print("Result:")
    print(response.text)

if __name__ == "__main__":
    main()
