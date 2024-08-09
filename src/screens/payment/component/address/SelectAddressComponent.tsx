import React, { memo, useEffect } from 'react';
import { Alert, FlatList, Pressable, Text } from 'react-native';
import { IconButton, Modal, Portal, RadioButton } from 'react-native-paper';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import { Colors } from '../../../../constants/Colors';
import { Variables } from '../../../../constants/Variables';
import { useLazyGetUserAddressQuery } from '../../../../redux/Service';
import { getAddressFromCoordinates } from '../../../../utils/LocationUtils';
import { moderateScale, scale, verticalScale } from '../../../../utils/ScaleUtils';

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
    const { onSelect, onCreate, visible, hideModal, ListAddress, isFetching, isLoading } = props;
    const [checked, setChecked] = React.useState<Address>();
    const [address, setAddrest] = React.useState<Address[]>([]);
    const containerStyle = { backgroundColor: 'white', marginHorizontal: 16, borderRadius: 5 };

    useEffect(() => {
        const fetchAddresses = async () => {
            const addresses = await Promise.all(ListAddress.map(async (item: any) => {
                const address = await getAddressFromCoordinates(item.lat, item.long);
                return {
                    addressCode: item.code,
                    addressDisplayName: address,
                    lat: item.lat,
                    long: item.long
                };
            }));
            setAddrest(addresses);
        };

        fetchAddresses();
    }, [ListAddress]);


    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <SessionComponent>
                    <RowComponent alignItems='center' justifyContent='space-between'>
                        <TextComponent fontSize={Variables.FONT_SIZE_BUTTON_TEXT} text='Vui lòng lựa chọn địa chỉ nhận hàng' color={Colors.BLACK} />
                        <IconButton icon={'close'}
                            onPress={hideModal}
                        />
                    </RowComponent>
                    {
                        address.length
                            ?
                            <FlatList
                                data={address}
                                extraData={address}
                                renderItem={({ item, index }) => (
                                    <Pressable
                                        android_ripple={{ color: 'transparent' }}
                                        style={{ flexDirection: 'row', justifyContent: 'center' }}
                                        onPress={() => setChecked({
                                            addressCode: item.addressCode,
                                            addressDisplayName: item.addressDisplayName,
                                            lat: item.lat,
                                            long: item.long
                                        })
                                        }
                                    >
                                        <RadioButton.Android
                                            color={Colors.COLOR_BTN_BLUE_PRIMARY}
                                            value={String(index)}
                                            status={checked?.addressCode === item.addressCode ? 'checked' : 'unchecked'}
                                            uncheckedColor={Colors.COLOR_BTN_BLUE_PRIMARY}
                                            onPress={() => setChecked({
                                                addressCode: item.addressCode,
                                                addressDisplayName: item.addressDisplayName,
                                                lat: item.lat,
                                                long: item.long
                                            })}
                                        />
                                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: scale(14),
                                                color: Colors.BLACK,
                                                marginBottom: verticalScale(10),
                                            }}
                                        >
                                            {item.addressDisplayName}
                                        </Text>
                                    </Pressable>
                                )}
                            />
                            :
                            <TextComponent color={Colors.BLACK} text={
                                (isLoading || isFetching) ? 'Đang tải địa chỉ giao hàng' : 'Chưa có địa chỉ giao hàng!'
                            } />
                    }

                    {/* Create new address */}
                    <TextButtonComponent
                        alignSelf='flex-start'
                        title={<TextComponent color={Colors.BLACK} text='Tạo địa chỉ mới' />}
                        onPress={() => onCreate()}
                    />
                    <SpaceComponent height={verticalScale(16)} />
                    <TextButtonComponent
                        backgroundColor={Colors.GREEN_500}
                        padding={moderateScale(10)}
                        borderRadius={5}
                        title={<TextComponent fontWeight='bold' color={Colors.WHITE} text='Xác nhận địa chỉ giao hàng' />}
                        onPress={() => {
                            onSelect(checked)
                        }}
                    />
                </SessionComponent>
            </Modal>
        </Portal>
    );
};

export default memo(SelectAddressComponent)