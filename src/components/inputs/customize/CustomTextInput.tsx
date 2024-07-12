// CustomTextInput.tsx
import React, { ReactNode, useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../constants/Colors';
import RowComponent from '../../row/RowComponent';
import { styles } from './CustomTextInput.style';
import TextComponent from '../../text/TextComponent';
import { useTranslation } from 'react-multi-lang';

interface CustomTextInputProps extends TextInputProps {
    error?: string;
    touched?: boolean;
    suffix?: ReactNode;
    affix?: ReactNode;
    title?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    onChangeText,
    onBlur,
    value,
    secureTextEntry,
    error,
    touched,
    suffix,
    affix,
    keyboardType,
    title
}) => {
    const t = useTranslation();
    const [show, setShow] = useState(secureTextEntry);
    const showPasswordIconName = 'eye-outline';
    const hidePasswordIconName = 'eye-off-outline';
    return (
        <View style={styles.container}>
            {
                Boolean(title) && <TextComponent  color={Colors.BLACK} text={title ?? ""} />
            }
            <RowComponent
                alignItems='center'
                styles={[styles.container__row, {
                    borderColor: touched ? error ? Colors.RED : Colors.GREEN : Colors.GREY_FEEBLE,
                }]}
            >
                {
                    suffix
                }
                <TextInput
                    style={styles['container__row--input']}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={show}
                    keyboardType={keyboardType}
                />
                {
                    secureTextEntry && <Pressable onPress={() => { setShow(!show) }}>
                        <IoniconsIcon name={show ? showPasswordIconName : hidePasswordIconName} size={22} />
                    </Pressable>
                }
            </RowComponent>
            {
                touched && error && <TextComponent color='red' text={`${t(error)}`} />
            }
        </View>
    );
};


export default CustomTextInput;
