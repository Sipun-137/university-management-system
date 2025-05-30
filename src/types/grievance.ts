export type GrievanceCategory = "ACADEMIC" | "ADMINISTRATIVE" | "TECHNICAL" | "OTHER"
export type GrievanceStatus = "PENDING" | "IN_REVIEW" | "RESOLVED" | "REJECTED"

export interface Grievance {
  id?: number
  title: string
  description: string
  category: GrievanceCategory
  status: GrievanceStatus
  response?: string | null
  attachmentUrl?: string | null
  submittedAt: string
  updatedAt?: string | null
  submittedByName: string
  submittedByEmail: string
  actionTaken?: string | null
}
