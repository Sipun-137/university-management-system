"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Printer, X, ImageIcon } from "lucide-react"
import { generateIDCard, printIDCard, generateWebIDCard, downloadCardAsImage } from "@/lib/id-card-generator"

interface StudentData {
  id: number
  name: string
  email: string
  phone: string
  regdNo: string
  rollNo: string
  bloodGroup: string
  course: string
  profilePhotoUrl: string | null
  academicStatus: string
  batch: {
    startYear: number
    endYear: number
  }
  branch: {
    name: string
  }
  section: string
  currentSemester: string
}

interface IDCardModalProps {
  isOpen: boolean
  onClose: () => void
  studentData: StudentData
}

export function IDCardModal({ isOpen, onClose, studentData }: IDCardModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadType, setDownloadType] = useState<"pdf" | "image" | null>(null)

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    setDownloadType("pdf")
    try {
      await generateIDCard(studentData)
    } catch (error) {
      console.error("Error generating PDF ID card:", error)
    } finally {
      setIsGenerating(false)
      setDownloadType(null)
    }
  }

  const handleDownloadImage = async () => {
    setIsGenerating(true)
    setDownloadType("image")
    try {
      await downloadCardAsImage(studentData)
    } catch (error) {
      console.error("Error generating image ID card:", error)
    } finally {
      setIsGenerating(false)
      setDownloadType(null)
    }
  }

  const handlePrint = () => {
    printIDCard(studentData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Student ID Card
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>Preview and download your student identification card</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* ID Card Preview */}
          <div className="flex justify-center">
            <div
              dangerouslySetInnerHTML={{ __html: generateWebIDCard(studentData) }}
              className="transform scale-75 origin-center"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                variant={downloadType === "pdf" ? "default" : "outline"}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating && downloadType === "pdf" ? "Generating..." : "PDF"}
              </Button>

              <Button
                onClick={handleDownloadImage}
                disabled={isGenerating}
                variant={downloadType === "image" ? "default" : "outline"}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                {isGenerating && downloadType === "image" ? "Generating..." : "Image"}
              </Button>
            </div>

            <Button variant="secondary" onClick={handlePrint} className="w-full">
              <Printer className="h-4 w-4 mr-2" />
              Print Card (with colors)
            </Button>
          </div>

          {/* Information */}
          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-medium">Download Options:</p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2 bg-blue-50 rounded">
                <span className="font-medium">PDF:</span> Professional format, exact layout match
              </div>
              <div className="p-2 bg-green-50 rounded">
                <span className="font-medium">Image:</span> High-resolution PNG, perfect colors
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <span className="font-medium">Print:</span> Direct printing with color preservation
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-medium">Card Information:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">Format:</span> Standard ID Card Size
              </div>
              <div>
                <span className="font-medium">Type:</span> Student Identity
              </div>
              <div>
                <span className="font-medium">Valid Until:</span> {studentData.batch.endYear}
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <Badge variant="outline" className="ml-1 text-xs">
                  {studentData.academicStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Note:</p>
            <p>
              This ID card is generated digitally and contains your current academic information. The image and print
              options preserve all colors and styling exactly as shown in the preview.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
