import jsPDF from "jspdf"

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

export const generateIDCard = async (studentData: StudentData) => {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [85.6, 53.98], // Standard ID card size
  })

  // Create gradient background effect
  pdf.setFillColor(30, 64, 175) // Blue gradient start
  pdf.rect(0, 0, 85.6, 53.98, "F")

  // Add gradient effect with multiple rectangles
  for (let i = 0; i < 20; i++) {
    const alpha = 1 - i * 0.03
    const blue = Math.floor(175 + i * 4)
    pdf.setFillColor(59, 130, Math.min(blue, 246))
    pdf.rect(0, i * 2.7, 85.6, 2.7, "F")
  }

  // Header section
  pdf.setFillColor(255, 255, 255, 0.1)
  pdf.rect(0, 0, 85.6, 12, "F")

  // University name
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(9)
  pdf.setFont("helvetica", "bold")
  pdf.text("UNIVERSITY NAME", 42.8, 6, { align: "center" })
  pdf.setFontSize(6)
  pdf.setFont("helvetica", "normal")
  pdf.text("Student Identity Card", 42.8, 9, { align: "center" })

  // Student photo area with border
  pdf.setFillColor(255, 255, 255, 0.2)
  pdf.rect(5, 15, 18, 22, "F")
  pdf.setDrawColor(255, 255, 255)
  pdf.setLineWidth(0.5)
  pdf.rect(5, 15, 18, 22, "S")

  // Photo placeholder with initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.text(getInitials(studentData.name), 14, 26, { align: "center" })

  // Main information area
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "bold")

  // Name
  const nameText = studentData.name.length > 18 ? studentData.name.substring(0, 18) + "..." : studentData.name
  pdf.text(nameText, 26, 18)

  // Roll Number
  pdf.setFontSize(8)
  pdf.setFont("helvetica", "normal")
  pdf.text(`Roll No: ${studentData.rollNo}`, 26, 23)

  // Course & Branch
  const courseText = `${studentData.course} - ${studentData.branch.name}`
  const shortCourse = courseText.length > 22 ? courseText.substring(0, 22) + "..." : courseText
  pdf.text(shortCourse, 26, 27)

  // Section & Semester
  pdf.text(`Section: ${studentData.section} | ${studentData.currentSemester}`, 26, 31)

  // QR Code placeholder
  pdf.setFillColor(0, 0, 0)
  pdf.rect(70, 15, 12, 12, "F")
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(6)
  pdf.text("QR", 76, 21, { align: "center" })

  // Footer information
  pdf.setFontSize(6)
  pdf.setTextColor(255, 255, 255, 0.8)
  pdf.text(`Reg: ${studentData.regdNo}`, 5, 45)
  pdf.text(`Batch: ${studentData.batch.startYear}-${studentData.batch.endYear}`, 30, 45)
  pdf.text(`Status: ${studentData.academicStatus}`, 60, 45)

  // Decorative elements
  pdf.setFillColor(255, 255, 255, 0.1)
  pdf.circle(75, 5, 8, "F")
  pdf.circle(10, 50, 6, "F")

  // Back side
  pdf.addPage()

  // Background for back side
  pdf.setFillColor(240, 248, 255)
  pdf.rect(0, 0, 85.6, 53.98, "F")

  // Header for back side
  pdf.setFillColor(30, 64, 175)
  pdf.rect(0, 0, 85.6, 10, "F")
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont("helvetica", "bold")
  pdf.text("STUDENT INFORMATION", 42.8, 6, { align: "center" })

  // Back side content
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(7)
  pdf.setFont("helvetica", "bold")

  // Contact Information
  pdf.text("Contact Information:", 5, 16)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(6)
  pdf.text(`Email: ${studentData.email}`, 5, 20)
  pdf.text(`Phone: ${studentData.phone}`, 5, 24)

  // Academic Information
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(7)
  pdf.text("Academic Details:", 5, 32)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(6)
  pdf.text(`Blood Group: ${studentData.bloodGroup}`, 5, 36)
  pdf.text(`Status: ${studentData.academicStatus}`, 5, 40)

  // Important Notice
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(6)
  pdf.setTextColor(220, 38, 38)
  pdf.text("IMPORTANT:", 5, 47)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(5)
  pdf.setTextColor(0, 0, 0)
  pdf.text("This card is property of the university. If found, please return to administration.", 5, 50)

  // Download the PDF
  const fileName = `${studentData.name.replace(/\s+/g, "_")}_ID_Card.pdf`
  pdf.save(fileName)
}

// Updated web-based ID card with better styling
export const generateWebIDCard = (studentData: StudentData): string => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return `
    <div style="
      width: 340px;
      height: 215px;
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%);
      border-radius: 12px;
      padding: 0;
      font-family: 'Arial', sans-serif;
      color: white;
      position: relative;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    ">
      <!-- Decorative Elements -->
      <div style="
        position: absolute;
        top: -20px;
        right: -20px;
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        bottom: -30px;
        left: -30px;
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
      "></div>

      <!-- Header -->
      <div style="
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 16px;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
      ">
        <h3 style="margin: 0; font-size: 14px; font-weight: bold;">UNIVERSITY NAME</h3>
        <p style="margin: 2px 0 0 0; font-size: 10px; opacity: 0.9;">Student Identity Card</p>
      </div>

      <!-- Main Content -->
      <div style="padding: 16px; display: flex; gap: 16px;">
        <!-- Photo Section -->
        <div style="
          width: 60px;
          height: 75px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
        ">
          ${getInitials(studentData.name)}
        </div>

        <!-- Information Section -->
        <div style="flex: 1;">
          <h2 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">${studentData.name}</h2>
          
          <div style="font-size: 11px; line-height: 1.4;">
            <p style="margin: 2px 0;"><strong>Roll No:</strong> ${studentData.rollNo}</p>
            <p style="margin: 2px 0;"><strong>Course:</strong> ${studentData.course}</p>
            <p style="margin: 2px 0;"><strong>Branch:</strong> ${studentData.branch.name}</p>
            <p style="margin: 2px 0;"><strong>Section:</strong> ${studentData.section}</p>
            <p style="margin: 2px 0;"><strong>Semester:</strong> ${studentData.currentSemester}</p>
          </div>
        </div>

        <!-- QR Code Placeholder -->
        <div style="
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        ">
          QR
        </div>
      </div>

      <!-- Footer -->
      <div style="
        position: absolute;
        bottom: 8px;
        left: 16px;
        right: 16px;
        display: flex;
        justify-content: space-between;
        font-size: 9px;
        opacity: 0.8;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      ">
        <span>Reg: ${studentData.regdNo}</span>
        <span>Batch: ${studentData.batch.startYear}-${studentData.batch.endYear}</span>
        <span>Status: ${studentData.academicStatus}</span>
      </div>
    </div>
  `
}

// Updated print function that preserves colors
export const printIDCard = (studentData: StudentData) => {
  const cardHTML = generateWebIDCard(studentData)

  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${studentData.name} - ID Card</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              margin: 0;
              padding: 20px;
              background: #f0f0f0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              font-family: Arial, sans-serif;
            }
            
            @media print {
              body {
                background: white !important;
                padding: 10mm !important;
              }
              
              /* Force colors to print */
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              /* Ensure the card fits on the page */
              .id-card {
                page-break-inside: avoid;
                transform: scale(1) !important;
              }
            }
            
            @page {
              size: A4;
              margin: 10mm;
            }
          </style>
        </head>
        <body>
          <div class="id-card">
            ${cardHTML}
          </div>
          <script>
            // Auto-print after a short delay
            setTimeout(() => {
              window.print();
            }, 500);
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }
}

// New function to download the card as an image
export const downloadCardAsImage = async (studentData: StudentData) => {
  try {
    // Create a temporary div to render the card
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = generateWebIDCard(studentData)
    tempDiv.style.position = "absolute"
    tempDiv.style.left = "-9999px"
    document.body.appendChild(tempDiv)

    // Import html2canvas dynamically
    const html2canvas = (await import("html2canvas")).default

    const cardElement = tempDiv.firstElementChild as HTMLElement

    // Generate canvas from the card element
    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
    })

    // Create download link
    const link = document.createElement("a")
    link.download = `${studentData.name.replace(/\s+/g, "_")}_ID_Card.png`
    link.href = canvas.toDataURL("image/png")
    link.click()

    // Clean up
    document.body.removeChild(tempDiv)
  } catch (error) {
    console.error("Error generating image:", error)
    // Fallback to PDF if image generation fails
    generateIDCard(studentData)
  }
}
