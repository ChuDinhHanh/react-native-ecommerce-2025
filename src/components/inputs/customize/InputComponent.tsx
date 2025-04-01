// CustomTextInput.tsx
import React, { ReactNode, useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../constants/Colors';
import RowComponent from '../../row/RowComponent';
import TextComponent from '../../text/TextComponent';
import { useTranslation } from 'react-multi-lang';
import { styles } from './InputComponent.style';
import { scale } from '../../../utils/ScaleUtils';
import { Variables } from '../../../constants/Variables';

interface CustomTextInputProps extends TextInputProps {
    error?: string;
    touched?: boolean;
    suffix?: ReactNode;
    affix?: ReactNode;
    title?: string;
    isRequired?: boolean;
    isAutoFocus?: boolean;
}

const InputComponent: React.FC<CustomTextInputProps> = ({
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
    title,
    isRequired,
    isAutoFocus
}) => {
    const t = useTranslation();
    const [show, setShow] = useState(secureTextEntry);
    const showPasswordIconName = 'eye-outline';
    const hidePasswordIconName = 'eye-off-outline';
    return (
        <View style={styles.container}>
            {
                Boolean(title) && <TextComponent color={Colors.BLACK} text={title ?? ""} />
            }
            {
                isRequired && <TextComponent customizeStyle={styles.container__text} text='*' color={Colors.RED} />
            }
            <RowComponent
                alignItems='center'
                styles={[
                    styles.container__row, {
                        borderColor: touched ? (error ? Colors.RED : Colors.COLOR_GREEN_SUCCESS) : (Colors.GREY_FEEBLE),
                    }]}
            >
                {
                    suffix
                }
                <TextInput
                    autoFocus={isAutoFocus ?? undefined}
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
                        <IoniconsIcon name={show ? showPasswordIconName : hidePasswordIconName} size={scale(22)} />
                    </Pressable>
                }
            </RowComponent>
            {
                touched && error && <TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} color='red' text={`${t(error)}`} />
            }
        </View>
    );
};


export default InputComponent;
