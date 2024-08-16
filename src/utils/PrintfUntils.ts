import {GetBillResponse} from '../types/response/GetBillResponse';
import {vietnameseCurrency} from './FormatNumberUtils';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';

export const handlePrintfBill = async (bill: GetBillResponse) => {
  const billHTML = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { padding: 16px; }
                .section { margin-bottom: 20px; border-bottom: 1px solid #E0E0E0; padding-bottom: 10px; }
                .title { font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #333; }
                .text { font-size: 14px; color: #555; margin-bottom: 4px; }
                .billItem { margin-bottom: 12px; padding: 8px; border-radius: 8px; border: 1px solid #E0E0E0; background-color: #FAFAFA; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="section">
                    <h2 class="title">User Information</h2>
                    <p class="text">${bill.user.name}</p>
                    <p class="text">${bill.user.email}</p>
                    <p class="text">${bill.user.phone}</p>
                </div>
                <div class="section">
                    <h2 class="title">Shipping Information</h2>
                    <p class="text">Method: ${bill.shippingMethod.name}</p>
                    <p class="text">Location: ${
                      bill.shippingMethod.location
                    }</p>
                    <p class="text">Price: ${bill.shippingMethod.price}</p>
                </div>
                <div class="section">
                    <h2 class="title">Address</h2>
                    <p class="text">${bill.address.description}</p>
                    <p class="text">${bill.address.location}</p>
                    <p class="text">Contact: ${bill.address.phoneGet}</p>
                    <p class="text">Receiver: ${bill.address.nameGet}</p>
                </div>
                <div class="section">
                    <h2 class="title">Bill Items</h2>
                    ${bill.billItems
                      .map(
                        item => `
                        <div class="billItem">
                            <p class="text">${item.product.name}</p>
                            <p class="text">Price: ${item.product.priceSaleOff}</p>
                            <p class="text">Classifies: ${item.productClassifies}</p>
                            <p class="text">Quantity: ${item.quantity}</p>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
                <div class="section">
                    <h2 class="title">Summary</h2>
                    <p class="text">Total Products Price: ${vietnameseCurrency(
                      bill.totalProductPrice,
                    )}</p>
                    <p class="text">Total Price: ${vietnameseCurrency(
                      bill.totalPrice,
                    )}</p>
                </div>
            </div>
        </body>
        </html>
    `;

  try {
    // Tạo file PDF từ nội dung HTML
    const options = {
      html: billHTML,
      fileName: 'BillDetails',
      directory: 'Documents',
    };
    const file = await RNHTMLtoPDF.convert(options);
    // Lưu file PDF xuống máy
    const destPath = `${RNFS.DownloadDirectoryPath}/BillDetails.pdf`;
    await RNFS.moveFile(file.filePath ?? '', destPath);
    Alert.alert(
      'Tải xuống thành công',
      'File hóa đơn đã được lưu tại: ' + destPath,
    );
  } catch (error: any) {
    Alert.alert('Lỗi', 'Không thể tạo file PDF: ' + error.message);
  }
};
