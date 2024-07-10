import {Dimensions} from 'react-native';

export const appInfo = {
  sizes: {
    //1. Lấy chiều cao của cửa sổ ứng dụng, không bao gồm các thanh trạng thái (status bar), or thanh điều hướng navigation. Và
    //  đây là kích thước thực tế mà ứng dụng của bạn có thể sử dụng để hiển thị nôij dung.
    //2 .Lấy chiều cao của toàn bộ thiết bị, bao gồm các khu vực không gian hệ thống như thanh trạng thái và trang điều hướng. Kích thước tổng thể
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
};
