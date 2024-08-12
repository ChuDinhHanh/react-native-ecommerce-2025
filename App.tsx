import notifee, { AndroidColor, AndroidImportance, AndroidStyle, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'
import Routes from './src/routes/Routes'

export default function App() {
  const [loading, setLoading] = useState(true);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log('Notification caused application to open');
      console.log('Press action used to open the app');
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);

    // Subscribe to foreground events
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification');
          break;
        case EventType.PRESS:
          console.log('User pressed notification');
          break;
      }
    });

    // Handle messages when the app is in the foreground
    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      onDisplayNotification();
    });

    // Handle messages when the app is in the background
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    notifee.getBadgeCount().then(count => {
      notifee.setBadgeCount(count);
    });

    return () => {
      unsubscribe();
      unsubscribeMessage();
    };
  }, []);

  if (loading) {
    return null;
  }

  // Display a notification
  async function onDisplayNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.RED,
    });

    await notifee.displayNotification({
      title: 'Image uploaded',
      body: 'Your image has been successfully uploaded',
      android: {
        channelId,
        largeIcon: require('./src/assets/images/logo/logoSplashScreen.png'),
        style: { type: AndroidStyle.BIGPICTURE, picture: 'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg' },
      },
    });
  }

  // Create a trigger notification
  async function onCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setHours(23);
    date.setMinutes(14);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'your-channel-id',
        },
      },
      trigger,
    );
  }

  // Cancel a notification
  async function cancel(notificationId: string) {
    await notifee.cancelNotification(notificationId);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer >
              <Routes />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}

// // return (
// //   <View>
// //     <Button title="Display Notification" onPress={() => onDisplayNotification()} />
// //     <Button title="Cancel Notification" onPress={() => cancel('hanh_cute')} />
// //     <Button title="Create Trigger Notification" onPress={() => onCreateTriggerNotification()} />
// //   </View>
// // );


// import { View, Text, Button } from 'react-native';
// import React, { useState } from 'react';
// import axios from 'axios';
// import qs from 'qs';
// import { WebView } from 'react-native-webview';

// const App = () => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [paypalUrl, setPaypalUrl] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState(null); // Thêm state để theo dõi trạng thái thanh toán

//   const buyBook = async () => {
//     const dataDetail = {
//       "intent": "sale",
//       "payer": {
//         "payment_method": "paypal"
//       },
//       "transactions": [{
//         "amount": {
//           "currency": "AUD",
//           "total": "26",
//           "details": {
//             "shipping": "6",
//             "subtotal": "20",
//             "shipping_discount": "0",
//             "insurance": "0",
//             "handling_fee": "0",
//             "tax": "0"
//           }
//         },
//         "description": "This is the payment transaction description",
//         "payment_options": {
//           "allowed_payment_method": "IMMEDIATE_PAY"
//         },
//         "item_list": {
//           "items": [{
//             "name": "Book",
//             "description": "Chasing After The Wind",
//             "quantity": "1",
//             "price": "20",
//             "tax": "0",
//             "sku": "product34",
//             "currency": "AUD"
//           }]
//         }
//       }],
//       "redirect_urls": {
//         "return_url": "https://yourapp.com/return",
//         "cancel_url": "https://yourapp.com/cancel"
//       }
//     };

//     const auth = {
//       username: "Aezrwcof_QuLrbTUbhJ9NH2Lxsu6T-cuzBskMOx6b5sS7uurC6gnKJS-UIgadTxGsxF5iZQ2tnz60G3B",
//       password: "EEvJwwrh6SWt8PEeP1dHDJntAwPF2R2idaCYCLXjT-IRlgGita7xYKMNIwauACnqcn3VwyIr3S3_8puw"
//     };

//     const tokenUrl = 'https://api.sandbox.paypal.com/v1/oauth2/token';
//     const data = { grant_type: 'client_credentials' };

//     const options = {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       data: qs.stringify(data),
//       auth,
//       url: tokenUrl,
//     };

//     try {
//       const tokenResponse = await axios(options);
//       const token = tokenResponse.data.access_token;
//       setAccessToken(token);

//       const paymentResponse = await axios.post(
//         'https://api.sandbox.paypal.com/v1/payments/payment',
//         dataDetail,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       const { links } = paymentResponse.data;
//       const approvalUrl = links.find(link => link.rel === "approval_url")?.href;

//       if (approvalUrl) {
//         setPaypalUrl(approvalUrl);
//       } else {
//         console.error("Approval URL not found in response.");
//       }
//     } catch (err) {
//       console.error("Payment error:", err.response?.data || err.message);
//     }
//   };

//   const parseQueryString = (queryString) => {
//     const params = {};
//     queryString.slice(1).split('&').forEach(part => {
//       const [key, value] = part.split('=');
//       params[key] = decodeURIComponent(value);
//     });
//     return params;
//   };

//   const handleNavigationStateChange = (navState) => {
//     console.log('Current URL:', navState.url); // Log URL để xem cấu trúc
//     if (navState.url.includes("https://yourapp.com/return")) {
//       const urlParams = parseQueryString(navState.url.split('?')[1]);
//       console.log('URL Params:', urlParams); // Log các tham số URL để xem cấu trúc

//       const paymentId = urlParams['paymentId'];
//       const payerId = urlParams['PayerID'];

//       if (paymentId && payerId) {
//         executePayment(paymentId, payerId);
//       } else {
//         console.error("Payment ID or Payer ID not found in URL.");
//       }
//     } else if (navState.url.includes("https://yourapp.com/cancel")) {
//       setPaymentStatus('Payment was canceled.');
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Text>App</Text>
//       <Button title="Buy Book" onPress={buyBook} />
//       {paypalUrl && (
//         <WebView
//           source={{ uri: paypalUrl }}
//           style={{ flex: 1, marginTop: 20 }}
//           onNavigationStateChange={handleNavigationStateChange}
//         />
//       )}
//       {paymentStatus && (
//         <Text style={{ marginTop: 20 }}>{paymentStatus}</Text>
//       )}
//     </View>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import qs from 'qs';
// import { WebView } from 'react-native-webview';

// const App = () => {
//   const [paypalUrl, setPaypalUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [accessToken, setAccessToken] = useState(null);

//   const buyBook = async () => {
//     const dataDetail = {
//       "intent": "sale",
//       "payer": {
//         "payment_method": "paypal"
//       },
//       "transactions": [{
//         "amount": {
//           "currency": "USD",
//           "total": "0.01",
//           "details": {
//             "shipping": "0",
//             "subtotal": "0.01",
//             "shipping_discount": "0",
//             "insurance": "0",
//             "handling_fee": "0",
//             "tax": "0"
//           }
//         },
//         "description": "This is the payment transaction description",
//         "payment_options": {
//           "allowed_payment_method": "IMMEDIATE_PAY"
//         },
//       }],
//       "redirect_urls": {
//         "return_url": "https://example.com/",
//         "cancel_url": "https://example.com/"
//       }
//     };

//     const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
//     const data = { grant_type: 'client_credentials' };
//     const auth = {
//       username: "YOUR_CLIENT_ID",
//       password: "YOUR_SECRET"
//     };

//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Access-Control-Allow-Credentials': true
//       },
//       data: qs.stringify(data),
//       auth,
//       url,
//     };

//     try {
//       setLoading(true);
//       const response = await axios(options);
//       const token = response.data.access_token;
//       setAccessToken(token); // Set the access token

//       const paymentResponse = await axios.post(
//         'https://api.sandbox.paypal.com/v1/payments/payment',
//         dataDetail,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       const { links } = paymentResponse.data;
//       const approvalUrl = links.find(link => link.rel === 'approval_url')?.href;

//       if (approvalUrl) {
//         setPaypalUrl(approvalUrl);
//       } else {
//         console.error("Approval URL not found in response.");
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const executePayment = async (paymentId, payerID) => {
//     if (!accessToken) {
//       console.error('Access token is not available.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
//         { payer_id: payerID },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}` // Use the stored access token
//           }
//         }
//       );

//       if (response.data.name === "INVALID_RESOURCE_ID") {
//         alert('Payment Failed. Please Try Again!');
//       } else {
//         console.log("Payment executed successfully", response.data);
//         // Handle successful payment here
//       }
//     } catch (error) {
//       console.error('Payment execution error:', error);
//     }
//   };

//   const onNavigationStateChange = (webViewState) => {
//     const url = webViewState.url;
//     if (url.includes('https://example.com/')) {
//       setPaypalUrl(null);

//       // Extract query parameters manually
//       const queryString = url.split('?')[1];
//       if (queryString) {
//         const params = {};
//         queryString.split('&').forEach(part => {
//           const [key, value] = part.split('=');
//           params[key] = decodeURIComponent(value);
//         });

//         const payerID = params['PayerID'];
//         const paymentId = params['paymentId'];

//         if (payerID && paymentId) {
//           executePayment(paymentId, payerID);
//         } else {
//           console.error('Payment ID or Payer ID not found in URL.');
//         }
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Processing Payment...</Text>
//           <ActivityIndicator size="large" color="black" />
//         </View>
//       ) : (
//         <TouchableOpacity
//           onPress={buyBook}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>COMPLETE PURCHASE</Text>
//         </TouchableOpacity>
//       )}

//       {paypalUrl && (
//         <WebView
//           style={{ flex: 1 }}
//           source={{ uri: paypalUrl }}
//           onNavigationStateChange={onNavigationStateChange}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           startInLoadingState={true}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: 'red',
//     padding: 10,
//     margin: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//   },
// });

// export default App;


// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
//   Alert
// } from 'react-native';
// import { WebView } from 'react-native-webview';
// import axios, { AxiosResponse } from 'axios';
// import qs from 'qs';
// import { decode, encode } from 'base-64';
// import queryString from 'query-string';


// // Định nghĩa kiểu dữ liệu cho phản hồi từ API PayPal
// interface PaypalPaymentResponse {
//   id: string;
//   links: { rel: string; href: string }[];
// }

// interface AccessTokenResponse {
//   access_token: string;
// }

// const App: React.FC = () => {
//   const [isWebViewLoading, setIsWebViewLoading] = useState<boolean>(false);
//   const [paypalUrl, setPaypalUrl] = useState<string | null>(null);
//   const [accessToken, setAccessToken] = useState<string>("");

//   useEffect(() => {
//     if (!global.btoa) {
//       global.btoa = encode;
//     }

//     if (!global.atob) {
//       global.atob = decode;
//     }
//   }, []);

//   const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState<boolean>(true);

//   const buyBook = async () => {
//     const dataDetail = {
//       "intent": "sale",
//       "payer": {
//         "payment_method": "paypal"
//       },
//       "transactions": [{
//         "amount": {
//           "currency": "AUD",
//           "total": "26",
//           "details": {
//             "shipping": "6",
//             "subtotal": "20",
//             "shipping_discount": "0",
//             "insurance": "0",
//             "handling_fee": "0",
//             "tax": "0"
//           }
//         },
//         "description": "This is the payment transaction description",
//         "payment_options": {
//           "allowed_payment_method": "IMMEDIATE_PAY"
//         },
//         "item_list": {
//           "items": [{
//             "name": "Book",
//             "description": "Chasing After The Wind",
//             "quantity": "1",
//             "price": "20",
//             "tax": "0",
//             "sku": "product34",
//             "currency": "AUD"
//           }]
//         }
//       }],
//       "redirect_urls": {
//         "return_url": "https://example.com/",
//         "cancel_url": "https://example.com/"
//       }
//     };

//     const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
//     const data = {
//       grant_type: 'client_credentials'
//     };

//     const auth = {
//       username: 'Aezrwcof_QuLrbTUbhJ9NH2Lxsu6T-cuzBskMOx6b5sS7uurC6gnKJS-UIgadTxGsxF5iZQ2tnz60G3B', // Thay thế bằng ID client PayPal của bạn
//       password: 'EEvJwwrh6SWt8PEeP1dHDJntAwPF2R2idaCYCLXjT-IRlgGita7xYKMNIwauACnqcn3VwyIr3S3_8puw'     // Thay thế bằng secret PayPal của bạn
//     };

//     try {
//       const tokenResponse: AxiosResponse<AccessTokenResponse> = await axios.post(url, qs.stringify(data), {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         auth: auth
//       });

//       const token = tokenResponse.data.access_token;
//       setAccessToken(token);

//       const paymentResponse: AxiosResponse<PaypalPaymentResponse> = await axios.post('https://api.sandbox.paypal.com/v1/payments/payment', dataDetail, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const { id, links } = paymentResponse.data;
//       const approvalUrl = links.find(link => link.rel === 'approval_url')?.href ?? '';

//       setPaypalUrl(approvalUrl);

//     } catch (error) {
//       console.error('Error during payment setup:', error.response ? error.response.data : error.message);
//     }
//   };

//   // const onWebviewLoadStart = () => {
//   //   if (shouldShowWebViewLoading) {
//   //     setIsWebViewLoading(true);
//   //   }
//   // };

//   const onWebviewNavigationStateChange = (webViewState: { title: string; url: string }) => {
//     console.log("webViewState", webViewState);

//     if (webViewState.title === "") {
//       setShouldShowWebviewLoading(false);
//     }

//     if (webViewState.url.includes('https://example.com/')) {
//       setPaypalUrl(null);
//       const urlArr = webViewState.url.split(/(=|&)/);

//       const paymentId = urlArr[2];
//       const payerId = urlArr[10];

//       axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: payerId }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         }
//       })
//         .then(response => {
//           setShouldShowWebviewLoading(true);
//           console.log('Payment executed successfully:', response.data);
//           // Alert.alert("thanh cong");
//         })
//         .catch(err => {
//           setShouldShowWebviewLoading(true);
//           console.error('Error executing payment:', err.response ? err.response.data : err.message);
//         });
//     }
//   };


//   return (
//     <>
//       <View style={styles.container}>
//         <Text>Paypal in React Native</Text>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           onPress={buyBook}
//           style={styles.btn}>
//           <Text
//             style={{
//               fontSize: 22,
//               fontWeight: '400',
//               textAlign: 'center',
//               color: '#ffffff',
//             }}>
//             BUY NOW
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {paypalUrl ? (
//         <View style={styles.webview}>
//           <WebView
//             style={{ height: "100%", width: "100%" }}
//             source={{ uri: paypalUrl }}
//             onNavigationStateChange={onWebviewNavigationStateChange}
//             javaScriptEnabled={true}
//             domStorageEnabled={true}
//             startInLoadingState={false}
//           // onLoadStart={onWebviewLoadStart}
//           // onLoadEnd={() => setIsWebViewLoading(false)}
//           />
//         </View>
//       ) : null}
//       {isWebViewLoading ? (
//         <View style={{ ...StyleSheet.absoluteFill, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
//           <ActivityIndicator size="small" color="#A02AE0" />
//         </View>
//       ) : null}
//     </>
//   );
// };

// // App.navigationOptions = {
// //   title: 'App',
// // };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   webview: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   btn: {
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     backgroundColor: '#61E786',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignContent: 'center',
//   },
// });