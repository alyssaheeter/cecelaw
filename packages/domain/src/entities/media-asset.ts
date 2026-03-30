import type { AssetType } from '../enums.js';

export interface MediaAsset {
  id: string;               // UUID — immutable
  evidenceId: string;       // FK → EvidenceItem — immutable
  parentAssetId?: string | null; // FK → MediaAsset — immutable; set for derived assets
  assetType: AssetType;     // immutable
  path: string;             // absolute path on local filesystem — immutable
  hash: string;             // SHA-256 of this file — immutable
  sizeBytes: number;        // immutable
  createdAt: string;        // ISO 8601 — immutable
}

export interface CreateMediaAssetInput {
  evidenceId: string;
  parentAssetId?: string;
  assetType: AssetType;
  path: string;
  hash: string;
  sizeBytes: number;
}
