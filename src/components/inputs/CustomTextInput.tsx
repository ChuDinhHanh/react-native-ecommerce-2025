// CustomTextInput.tsx
import React, { ReactNode, useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import RowComponent from '../row/RowComponent';
import { styles } from './CustomTextInput.style';

interface CustomTextInputProps extends TextInputProps {
    error?: string;
    touched?: boolean;
    suffix?: ReactNode;
    affix?: ReactNode;
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
}) => {
    const [show, setShow] = useState(secureTextEntry);
    const showPasswordIconName = 'eye-outline';
    const hidePasswordIconName = 'eye-off-outline';
    return (
        <View style={styles.container}>
            <RowComponent
                alignItems='center'
                styles={{
                    borderBottomWidth: 1,
                    borderColor: touched ? error ? Colors.RED : Colors.GREEN : Colors.GREY_FEEBLE,
                }}
            >
                {
                    suffix
                }
                <TextInput
                    style={{
                        padding: 10,
                        marginBottom: 5,
                        flex: 1
                    }}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={show}
                />
                {
                    secureTextEntry && <Pressable onPress={() => { setShow(!show) }}>
                        <IoniconsIcon name={show ? showPasswordIconName : hidePasswordIconName} size={22} />
                    </Pressable>
                }
            </RowComponent>
            {touched && error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};


export default CustomTextInput;
