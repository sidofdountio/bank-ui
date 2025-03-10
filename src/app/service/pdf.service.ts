import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'; import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(elementId: string, fileName: string): void {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    html2canvas(element, { scale: 2, useCORS: true })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 190; // A4 width
        const pageHeight = 297; // A4 height
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const margin = 10;
        let heightLeft = imgHeight;
        let position = margin;

        const footerText = "  NB : Sauf réclamation de votre part dans un délai de 30 jours à compter de la date ci-dessus, nous considérons ce relevé comme approuvé. \n\n" +
        "Afriland First Bank - SA au capital de 50 000 000 000 F. CFA - R.C. 87R0411 - N° Contribuable M 10870000000 43 E - Telex 88907 KN - Site Web www.afrilandfirstbank.com \n\n" +
        "E-mail : qualite@afrilandfirstbank.com - Siège social : B.P. 11834 Yaoundé - Tél : 222 23 30 68 / 222 22 63 27 - Fax: 222 22 17 85 - SWIFT : CCEICMCX";
        // const footerText = "";

        // Add the first page
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        this.addFooter(pdf, footerText, pageHeight, margin);
        heightLeft -= (pageHeight - margin * 2);

        // Handle additional pages
        while (heightLeft >= 0) {
          position = margin - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          this.addFooter(pdf, footerText, pageHeight, margin);
          heightLeft -= (pageHeight - margin * 2);
        }

        // Save the PDF
        pdf.save(fileName);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
      });
  }



  addFooter(pdf: jsPDF, text: string, pageHeight: number, margin: number): void {
    pdf.setFontSize(6);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    const footerX = margin; // Adjust the X coordinate as needed
    const footerY = pageHeight - 13; // Adjust Y position
    const footerWidth = pdf.internal.pageSize.width - 2 * margin; // Calculate footer width
    pdf.text(text, footerX, footerY, { maxWidth: footerWidth, align: 'left' });
  }


  
}
