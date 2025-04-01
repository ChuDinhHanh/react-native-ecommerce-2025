import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {verticalScale, moderateScale} from 'react-native-size-matters';

const BillSkeletonItem = () => {
  return (
    <View
      style={{
        padding: moderateScale(16),
        marginBottom: verticalScale(20),
        borderRadius: moderateScale(5),
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderColor: '#e0e0e0',
        borderWidth: 1,
      }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item>
          {/* Skeleton cho tiêu đề hóa đơn */}
          <SkeletonPlaceholder.Item
            width="60%"
            height={20}
            borderRadius={4}
            marginBottom={verticalScale(16)}
            borderWidth={1}
            borderColor="#e0e0e0"
          />

          {/* Skeleton cho danh sách sản phẩm */}
          {[1, 2, 3].map((item, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={verticalScale(12)}
              borderColor="#e0e0e0"
              borderWidth={1}
              padding={moderateScale(8)}
              borderRadius={moderateScale(8)}>
              {/* Bọc các item bằng một View */}
              <View style={{flex: 1}}>
                {/* Tên sản phẩm */}
                <SkeletonPlaceholder.Item
                  width="70%"
                  height={15}
                  borderRadius={4}
                  marginBottom={verticalScale(6)}
                  borderWidth={1}
                  borderColor="#e0e0e0"
                />
                {/* Số lượng và giá */}
                <SkeletonPlaceholder.Item
                  width="50%"
                  height={15}
                  borderRadius={4}
                  borderWidth={1}
                  borderColor="#e0e0e0"
                />
              </View>
              {/* Tổng giá */}
              <SkeletonPlaceholder.Item
                width={moderateScale(80)}
                height={15}
                borderRadius={4}
                borderWidth={1}
                borderColor="#e0e0e0"
              />
            </SkeletonPlaceholder.Item>
          ))}

          {/* Skeleton cho tổng cộng */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop={verticalScale(20)}
            borderColor="#e0e0e0"
            borderWidth={1}
            padding={moderateScale(8)}
            borderRadius={moderateScale(8)}>
            <SkeletonPlaceholder.Item
              width="40%"
              height={15}
              borderRadius={4}
              borderWidth={1}
              borderColor="#e0e0e0"
            />
            <SkeletonPlaceholder.Item
              width="30%"
              height={15}
              borderRadius={4}
              borderWidth={1}
              borderColor="#e0e0e0"
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default BillSkeletonItem;
