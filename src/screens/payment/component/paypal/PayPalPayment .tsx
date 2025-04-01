import axios, {AxiosResponse} from 'axios';
import {decode, encode} from 'base-64';
import qs from 'qs';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from './PayPalPayment.style';
import {useTranslation} from 'react-multi-lang';
import FastImage from 'react-native-fast-image';

interface PaypalPaymentResponse {
  id: string;
  links: {rel: string; href: string}[];
}

interface AccessTokenResponse {
  access_token: string;
}

interface PayPalPaymentProps {
  currency: string;
  total: string;
  shipping: string;
  subtotal: string;
  shipping_discount: string;
  tax: string;
  successPayment: () => void;
  failPayment: () => void;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({
  currency,
  total,
  shipping,
  subtotal,
  shipping_discount,
  tax,
  successPayment,
  failPayment,
}) => {
  const [isWebViewLoading, setIsWebViewLoading] = useState<boolean>(false);
  const [paypalUrl, setPaypalUrl] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const t = useTranslation();
  useEffect(() => {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
  }, []);

  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] =
    useState<boolean>(true);

  const buyBook = async () => {
    const dataDetail = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            currency: currency, // Đảm bảo 'currency' là 'VND'
            total: total,
            details: {
              shipping: shipping,
              subtotal: subtotal,
              shipping_discount: shipping_discount,
              insurance: '0',
              handling_fee: '0',
              tax: tax,
            },
          },
          description: 'This is the payment transaction description',
          payment_options: {
            allowed_payment_method: 'IMMEDIATE_PAY',
          },
          item_list: {
            items: [
              {
                name: 'Book',
                description: 'Chasing After The Wind',
                quantity: '1',
                price: subtotal, // Đảm bảo 'price' là 'VND'
                tax: tax, // Đảm bảo 'tax' là 'VND'
                sku: 'product34',
                currency: currency, // Đảm bảo 'currency' là 'VND'
              },
            ],
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com/',
        cancel_url: 'https://example.com/',
      },
    };

    const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';
    const data = {
      grant_type: 'client_credentials',
    };

    const auth = {
      username:
        'Aezrwcof_QuLrbTUbhJ9NH2Lxsu6T-cuzBskMOx6b5sS7uurC6gnKJS-UIgadTxGsxF5iZQ2tnz60G3B', // Thay thế bằng ID client PayPal của bạn
      password:
        'EEvJwwrh6SWt8PEeP1dHDJntAwPF2R2idaCYCLXjT-IRlgGita7xYKMNIwauACnqcn3VwyIr3S3_8puw', // Thay thế bằng secret PayPal của bạn
    };

    try {
      const tokenResponse: AxiosResponse<AccessTokenResponse> =
        await axios.post(url, qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: auth,
        });

      const token = tokenResponse.data.access_token;
      setAccessToken(token);

      const paymentResponse: AxiosResponse<PaypalPaymentResponse> =
        await axios.post(
          'https://api.sandbox.paypal.com/v1/payments/payment',
          dataDetail,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

      const {id, links} = paymentResponse.data;
      const approvalUrl =
        links.find(link => link.rel === 'approval_url')?.href ?? '';

      setPaypalUrl(approvalUrl);
    } catch (error: any) {
      console.error(
        'Error during payment setup:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const handlePaymentSuccess = () => {
    setShouldShowWebviewLoading(true);
    successPayment();
  };

  const handlePaymentFailure = () => {
    setShouldShowWebviewLoading(true);
    failPayment();
  };

  const onWebviewNavigationStateChange = (webViewState: {
    title: string;
    url: string;
  }) => {
    console.log('webViewState', webViewState);

    if (webViewState.title === '') {
      setShouldShowWebviewLoading(false);
    }

    if (webViewState.url.includes('https://example.com/')) {
      setPaypalUrl(null);
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payer_id: payerId},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then(response => {
          handlePaymentSuccess();
          console.log('Payment executed successfully:', response.data);
        })
        .catch(err => {
          handlePaymentFailure();
          console.error(
            'Error executing payment:',
            err.response ? err.response.data : err.message,
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={buyBook}
        style={styles.btn}>
        <FastImage
          source={require('../../../../assets/images/data/payment/pngwing.com.png')}
          style={styles.btnImage}
        />
        <Text style={styles.btnText}>{t('PaypalScreen.title')}</Text>
      </TouchableOpacity>
      {paypalUrl ? (
        <View style={styles.webview}>
          <WebView
            style={styles.webviewContent}
            source={{uri: paypalUrl}}
            onNavigationStateChange={onWebviewNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
          />
        </View>
      ) : null}
      {isWebViewLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#A02AE0" />
        </View>
      )}
    </View>
  );
};

export default PayPalPayment;
