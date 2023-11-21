function fetchData() {
    return fetch(
      "https://65180651582f58d62d355368.mockapi.io/MainStorage"
    ).then((response) => response.json());
  }

  function generatePDF() {
    fetchData()
      .then((data) => {
        const doc = new jsPDF();

        let yPos = 20;
        let pageHeight = doc.internal.pageSize.height;
        let currentPage = 1;

        data.forEach((user) => {
          doc.text(`Tên: ${user.name}`, 20, yPos);
          doc.text(`Email: ${user.email}`, 20, yPos + 10);
          doc.text(`Password: ${user.password}`, 20, yPos + 20);

          if (yPos + 40 > pageHeight) {
            doc.addPage();
            currentPage++;
            yPos = 20;
          } else {
            yPos += 40;
          }
        });

        const pdfDataUri = doc.output("datauristring");

        const downloadLink = document.createElement("a");
        downloadLink.href = pdfDataUri;
        downloadLink.download = "user_information.pdf";
        downloadLink.click();
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API:", error);
      });
  }