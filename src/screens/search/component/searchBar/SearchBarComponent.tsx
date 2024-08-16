import React, { useState } from 'react'
import { Alert, TextInput, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RowComponent from '../../../../components/row/RowComponent'
import { Colors } from '../../../../constants/Colors'
import { moderateScale } from '../../../../utils/ScaleUtils'
import { styles } from './SearchBarComponent.style'
import { isBlank } from '../../../../utils/Rules'
import { useTranslation } from 'react-multi-lang'
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent'

interface Props {
    onSubmit: (value: string) => void;
    isDisabled: boolean;
}
const SearchBarComponent = (props: Props) => {
    const t = useTranslation();
    const { onSubmit, isDisabled } = props;
    const [content, setContent] = useState('');

    const handleSubmitEvent = (value: string) => {
        const result = isBlank(value);
        if (result) {
            Alert.alert(t("Alert.warning"), t("SearchScreen.inputSearchRequired"));
        } else {
            onSubmit(content);
        }

    }

    return (
        <RowComponent
            alignItems='center'
        >
            <View
                style={styles.container__left}
            >
                <TextInput
                    placeholder={t("SearchScreen.placeholder")}
                    value={content}
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
                disable={isDisabled}
                typeNoBackground
                onPress={() => handleSubmitEvent(content)}
                icon={<AntDesign name='search1' color={Colors.BLACK} size={moderateScale(20)} />}
            />
        </RowComponent>
    )
}

export default SearchBarComponent