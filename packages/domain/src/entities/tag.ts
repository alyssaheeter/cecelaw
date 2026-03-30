/**
 * Tag — lightweight label for categorizing annotations.
 *
 * V1 scope: Tags are applied to Annotations only.
 * Tag-to-EvidenceItem M2M is deferred to Phase 4.
 *
 * matterId = null means the tag is global (available across all matters).
 * matterId set means the tag is scoped to that matter only.
 */
export interface Tag {
  id: string;               // UUID — immutable
  matterId?: string | null; // FK → Matter — null = global tag
  name: string;             // editable
  color?: string | null;    // hex color for UI display — editable
  description?: string | null; // editable
}

export interface CreateTagInput {
  matterId?: string;
  name: string;
  color?: string;
  description?: string;
}

export interface UpdateTagInput {
  name?: string;
  color?: string | null;
  description?: string | null;
}
