async function mergePDFs() {
  const input = document.getElementById('pdfFiles');
  if (!input.files.length) return alert('Please select PDF files.');

  const { PDFDocument } = await import('https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js');
  const mergedPdf = await PDFDocument.create();

  for (const file of input.files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  const blob = new Blob([mergedBytes], { type: 'application/pdf' });
  const link = document.getElementById('downloadLink');
  link.href = URL.createObjectURL(blob);
  link.style.display = 'inline-block';
  link.textContent = 'Download Merged PDF';
}
