export type NoticeType = "EXAM" | "ASSIGNMENT" | "EVENT" | "ANNOUNCEMENT" | "OTHER"

export interface Notice {
  id?: number
  title: string
  description: string
  attachmentUrl?: string | null
  type: NoticeType
  targetAudience: string
  validFrom: string
  validTo: string
  createdBy?: string | null
}
