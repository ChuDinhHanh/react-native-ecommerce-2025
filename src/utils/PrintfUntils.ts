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
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .container { padding: 16px; }
            .section { margin-bottom: 20px; border-bottom: 1px solid #E0E0E0; padding-bottom: 10px; }
            .title { font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #333; }
            .text { font-size: 14px; color: #555; margin-bottom: 4px; }
            .billItem { margin-bottom: 12px; padding: 8px; border-radius: 8px; border: 1px solid #E0E0E0; background-color: #FAFAFA; }
            .actions { display: flex; justify-content: space-between; margin-top: 20px; }
            .button { padding: 10px 20px; border-radius: 5px; color: #FFF; font-weight: bold; text-align: center; cursor: pointer; }
            .cancelButton { background-color: #FF6F6F; }
            .printButton { background-color: #4CAF50; }
            .titleBill { text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #333; }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- User Information -->
              <h2 class="titleBill">Bill: ${bill.code}</h2>
              <div class="section">
                <p class="text">Created At: ${bill.createdAt}</p>
                <p class="text">Payment Method: ${bill.paymentMethod}</p>
            </div>
            <div class="section">
                <h2 class="title">User Info</h2>
                <p class="text">Username: ${bill.user.name}</p>
                <p class="text">Email: ${bill.user.email}</p>
                <p class="text">Phone: ${bill.user.phone}</p>
            </div>

            <!-- Shipping Information -->
            <div class="section">
                <h2 class="title">Shipping Info</h2>
                <p class="text">Method: ${bill.shippingMethod.name}</p>
                <p class="text">Location: ${bill.shippingMethod.location}</p>
                <p class="text">Price: ${bill.shippingMethod.price}</p>
            </div>

            <!-- Address -->
            <div class="section">
                <h2 class="title">Address</h2>
                <p class="text">Description: ${bill.address.description}</p>
                <p class="text">Delivery Address: ${bill.address.location}</p>
                <p class="text">Contact: ${bill.address.phoneGet}</p>
                <p class="text">Receiver: ${bill.address.nameGet}</p>
            </div>

            <!-- Bill Items -->
            <div class="section">
                <h2 class="title">Bill Items</h2>
                ${bill.billItems
                  .map(
                    item => `
                    <div class="billItem">
                        <p class="text">Shop: ${item.product.author.name}</p>
                        <p class="text">Product: ${item.product.name}</p>
                        <p class="text">Price: ${item.product.priceSaleOff}</p>
                        <p class="text">Classifies: ${item.productClassifies}</p>
                        <p class="text">Quantity: x${item.quantity}</p>
                    </div>
                `,
                  )
                  .join('')}
            </div>

            <!-- Bill Summary -->
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
    const options = {
      html: billHTML,
      fileName: 'bill_' + new Date().toISOString().replace(/:/g, '-') + '.pdf',
      directory: 'Documents',
    };
    const file = await RNHTMLtoPDF.convert(options);

    const destPath = `${RNFS.DownloadDirectoryPath}/bill_${new Date()
      .toISOString()
      .replace(/:/g, '-')}.pdf`;
    await RNFS.moveFile(file.filePath ?? '', destPath);
    Alert.alert(
      'Download Successful',
      'The invoice file has been saved to: ' + destPath,
    );
  } catch (error: any) {
    Alert.alert('Error', 'Unable to create PDF file: ' + error.message);
  }
};
