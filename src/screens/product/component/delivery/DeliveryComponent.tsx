import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SessionComponent from '../../../../components/session/SessionComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { moderateScale, scale } from '../../../../utils/ScaleUtils'
import { Image } from 'react-native'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../../../constants/Colors'
import { styles } from './DeliveryComponent.style'

interface Props {
    startLocation: string,
    endLocation: string,
    onChangeAddress: () => void;
}
const DeliveryComponent = (props: Props) => {
    const { endLocation, onChangeAddress, startLocation } = props;
    return (
        <SessionComponent>
            <TextComponent
                text="Vận chuyển:"
                fontSize={scale(18)}
                color={Colors.BLACK}
            />
            {/* Estimated delivery time */}
            <View style={styles.container}>
                {/* Start location */}
                <View style={styles.container__wrapper}>
                    <View style={styles['container__wrapper--inside']}>
                        {/* Node */}
                        <View>
                            <View style={styles['wrapper__inside--left']}>
                                <View style={styles['inside__left--node']} />
                            </View>
                            <View style={styles['wrapper__inside--right']}>
                                <Image style={styles['inside__right--image']} source={require('../../../../assets/images/data/product/truckShip.png')} />
                                <SpaceComponent width={moderateScale(10)} />
                                <TextComponent numberOfLines={1} fontSize={scale(14)} text={startLocation} color={Colors.BLACK} />
                            </View>
                        </View>
                        {/* Divider */}
                        <View
                            style={styles['wrapper__inside--divider']}
                        />
                        {/* Node */}
                        <View>
                            <View style={styles['wrapper__inside--bottom']}>
                                {/* Node */}
                                <View style={styles['inside__bottom--node']} />
                            </View>
                            <View style={styles['bottom__node--right']}>
                                <Image style={styles['node__right--image']} source={require('../../../../assets/images/data/product/truck.png')} />
                                <SpaceComponent width={moderateScale(10)} />
                                <TextButtonComponent
                                    isTextFixed
                                    spaceSuffix={moderateScale(10)}
                                    iconOrImageSuffix={
                                        <IconAntDesign name="down" size={15} color={Colors.BLACK} />
                                    }
                                    onPress={() => { console.log("change address") }}
                                    title={
                                        <TextComponent numberOfLines={1} fontSize={scale(14)} text={endLocation} color={Colors.BLACK} />
                                    } />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SessionComponent>
    )
}


export default DeliveryComponent