import React, {ReactNode, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface Props {
  ref: boolean | null;
  children: ReactNode;
}

const BottomSheetComponent = (props: Props) => {
  const {ref, children} = props;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    if (ref !== null && ref) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [ref]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Thông tin chi tiết sản phẩm</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheetComponent;
