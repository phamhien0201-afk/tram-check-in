import html2canvas from 'html2canvas';

/**
 * Xuất phần tử Hóa đơn thành ảnh PNG chất lượng cao để chia sẻ mạng xã hội
 * @param {HTMLElement} element - Thẻ DOM chứa hóa đơn
 * @param {string} fileName - Tên file tải về
 */
export async function exportReceiptToImage(element, fileName = "hoa-don-cam-xuc.png") {
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2.5, // Tăng độ phân giải cho ảnh sắc nét trên Retina / Mobile
      backgroundColor: null, // Giữ nền trong suốt nếu có
      useCORS: true,
      logging: false,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Lỗi khi xuất ảnh hóa đơn:", error);
    alert("Không thể xuất ảnh lúc này. Bạn có thể chụp màn hình nhé!");
  }
}
