import React, {memo, useEffect} from 'react';
import {useTranslation} from 'react-multi-lang';
import {FlatList, Pressable, Text} from 'react-native';
import {IconButton, Modal, Portal, RadioButton} from 'react-native-paper';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../../../utils/ScaleUtils';
import {styles} from './SelectAddressComponent.style';
import {useAppSelector} from '../../../../redux/Hooks';

interface Props {
  onSelect: (item: any) => void;
  onCreate: () => void;
  hideModal: () => void;
  visible: boolean;
  user: string;
  token: string;
  ListAddress: any;
  isLoading: boolean;
  isFetching: boolean;
}

interface Address {
  addressCode: string;
  addressDisplayName: string;
  lat: string;
  long: string;
}

const SelectAddressComponent = (props: Props) => {
  const t = useTranslation();
  const language = useAppSelector(state => state.SpeedReducer.language);
  const {
    onSelect,
    onCreate,
    visible,
    hideModal,
    ListAddress,
    isFetching,
    isLoading,
  } = props;
  const [checked, setChecked] = React.useState<Address>();
  const [address, setAddrest] = React.useState<Address[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses = await Promise.all(
        ListAddress.map(async (item: any) => {
          return {
            addressCode: item.code,
            addressDisplayName: item.location,
            lat: item.lat,
            long: item.long,
          };
        }),
      );
      setAddrest(addresses);
    };
    fetchAddresses();
  }, [ListAddress]);

  useEffect(() => {
    if (ListAddress?.length <= 0) return;
    const result = ListAddress?.filter(
      (element: any) => element.status === '1',
    );
    if (result?.length) {
      const dataSelect: Address = {
        addressCode: result[0].code,
        addressDisplayName: result[0].location,
        lat: result[0].lat,
        long: result[0].long,
      };
      onSelect(dataSelect);
      setChecked(dataSelect);
    }
  }, [ListAddress?.length]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <SessionComponent>
          <RowComponent alignItems="center" justifyContent="space-between">
            <TextComponent
              fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
              text={t('SelectAddress.chooseAddress')}
              color={Colors.BLACK}
            />
            <IconButton icon={'close'} onPress={hideModal} />
          </RowComponent>
          {address.length ? (
            <FlatList
              data={address}
              extraData={address}
              renderItem={({item, index}) => (
                <Pressable
                  android_ripple={{color: 'transparent'}}
                  style={{flexDirection: 'row', justifyContent: 'center'}}
                  onPress={() =>
                    setChecked({
                      addressCode: item.addressCode,
                      addressDisplayName: item.addressDisplayName,
                      lat: item.lat,
                      long: item.long,
                    })
                  }>
                  <RadioButton.Android
                    color={Colors.COLOR_BTN_BLUE_PRIMARY}
                    value={String(index)}
                    status={
                      checked?.addressCode === item.addressCode
                        ? 'checked'
                        : 'unchecked'
                    }
                    uncheckedColor={Colors.COLOR_BTN_BLUE_PRIMARY}
                    onPress={() =>
                      setChecked({
                        addressCode: item.addressCode,
                        addressDisplayName: item.addressDisplayName,
                        lat: item.lat,
                        long: item.long,
                      })
                    }
                  />
                  <Text style={styles.textTitle}>
                    {item.addressDisplayName}
                  </Text>
                </Pressable>
              )}
            />
          ) : (
            <TextComponent
              color={Colors.BLACK}
              text={
                isLoading || isFetching
                  ? t('SelectAddress.loading')
                  : t('SelectAddress.noAddress')
              }
            />
          )}

          {/* Create new address */}
          <TextButtonComponent
            alignSelf="flex-start"
            title={
              <TextComponent
                color={Colors.BLACK}
                text={t('SelectAddress.createNewAddress')}
              />
            }
            onPress={() => onCreate()}
          />
          <SpaceComponent height={verticalScale(16)} />
          <TextButtonComponent
            backgroundColor={Colors.GREEN_500}
            padding={moderateScale(10)}
            borderRadius={5}
            title={
              <TextComponent
                fontWeight="bold"
                color={Colors.WHITE}
                text={t('SelectAddress.confirmAddress')}
              />
            }
            onPress={() => {
              onSelect(checked);
            }}
          />
        </SessionComponent>
      </Modal>
    </Portal>
  );
};

export default SelectAddressComponent;
