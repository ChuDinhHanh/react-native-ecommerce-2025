import React, { useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import { Colors } from '../../../../constants/Colors';
import { moderateScale } from '../../../../utils/ScaleUtils';
import { styles } from './InputMessengerScreenComponent.style';

interface Props {
    placeholder: string;
    onSubmit: (content: string) => void;
    isLoading: boolean;
}

const InputMessengerScreenComponent = (props: Props) => {
    const { placeholder, onSubmit, isLoading } = props;
    const [messenger, setMessenger] = useState('');
    const memoizedMessenger = useMemo(() => messenger, [messenger]);
    return (
        <View style={styles.container}>
            <Divider />
            <SessionComponent padding={moderateScale(16)}>
                <RowComponent justifyContent={'space-between'} alignItems="center">
                    <TextInput
                        value={memoizedMessenger}
                        onChangeText={val => setMessenger(val)}
                        placeholder={placeholder}
                        style={[styles.input]}
                    />
                    <IconButtonComponent
                        disable={isLoading}
                        typeNoBackground
                        icon={isLoading ? <ActivityIndicator size={moderateScale(22)} color={Colors.COLOR_BTN_BLUE_PRIMARY} /> : <FontAwesome name='send' size={moderateScale(22)} color={Colors.COLOR_BTN_BLUE_PRIMARY} />}
                        onPress={() => { onSubmit(messenger); setMessenger('') }} />
                </RowComponent>
            </SessionComponent>
        </View>
    )
}

export default InputMessengerScreenComponent