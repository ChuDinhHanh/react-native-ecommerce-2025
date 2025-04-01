import { View, Text, Image, ImageSourcePropType, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors'
import { moderateScale } from '../../../../utils/ScaleUtils'
import RowComponent from '../../../../components/row/RowComponent'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import TextComponent from '../../../../components/text/TextComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
    id: number;
    flag: ImageSourcePropType | undefined;
    countryName: string;
    isSelected: boolean;
    onSubmit: (id: number) => void;
}

const SelectLanguageScreenItemCountry = (props: Props) => {
    const { countryName, flag, isSelected, onSubmit, id } = props;
    return (
        <Pressable
            onPress={() => onSubmit(id)}
            style={{ width: '100%', backgroundColor: Colors.WHITE, borderRadius: 100, marginBottom: moderateScale(16) }}>
            <RowComponent paddingVertical={moderateScale(5)} paddingHorizontal={moderateScale(10)} alignItems='center' justifyContent='space-between'>
                {/* Country name and flag */}
                <RowComponent justifyContent='flex-start' alignItems='center'>
                    <Image source={flag}
                        style={{
                            width: moderateScale(40),
                            height: moderateScale(40),
                            borderRadius: moderateScale(20),
                            objectFit: 'cover',
                            borderWidth: .5,
                            borderColor: Colors.GREY_FEEBLE
                        }} />
                    <SpaceComponent width={moderateScale(20)} />
                    <TextComponent text={countryName} color={Colors.BLACK} />
                </RowComponent>
                {
                    isSelected && <AntDesign name='checkcircle' size={moderateScale(25)} color={Colors.GREEN_500} />
                }
                {/* Icon selected */}
            </RowComponent>
        </Pressable>
    )
}

export default SelectLanguageScreenItemCountry