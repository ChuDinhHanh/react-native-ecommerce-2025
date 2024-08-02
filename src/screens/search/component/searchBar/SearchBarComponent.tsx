import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { Colors } from '../../../../constants/Colors'
import { moderateScale, verticalScale } from '../../../../utils/ScaleUtils'
import RowComponent from '../../../../components/row/RowComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent'
import { styles } from './SearchBarComponent.style'


const SearchBarComponent = () => {
    const [content, setContent] = useState('');
    return (
        <RowComponent
            alignItems='center'
        >
            <View
                style={styles.container__left}
            >
                <TextInput
                    style={styles.container__input}
                    onChangeText={(values) => setContent(values)}
                />
                <IconButtonComponent
                    customStyle={styles.container__btn}
                    typeNoBackground
                    onPress={() => { }}
                    icon={<FontAwesome name='microphone' color={Colors.BLACK} size={moderateScale(20)} />}
                />
            </View>
            <IconButtonComponent
                customStyle={styles.container__right}
                typeNoBackground
                onPress={() => { console.log(content) }}
                icon={<AntDesign name='search1' color={Colors.BLACK} size={moderateScale(20)} />}
            />
        </RowComponent>
    )
}

export default SearchBarComponent