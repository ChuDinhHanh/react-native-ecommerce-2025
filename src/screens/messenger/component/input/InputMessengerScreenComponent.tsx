import { View, Text, TextInput } from 'react-native'
import React, { ReactNode, useMemo, useState } from 'react'
import { Divider } from 'react-native-paper';
import { styles } from './InputMessengerScreenComponent.style';
import SessionComponent from '../../../../components/session/SessionComponent';
import RowComponent from '../../../../components/row/RowComponent';
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import { moderateScale } from '../../../../utils/ScaleUtils';
import { Colors } from '../../../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
    placeholder: string;
}

const InputMessengerScreenComponent = (props: Props) => {
    const { placeholder } = props;
    const [messenger, setMessenger] = useState('');
    const memoizedMessenger = useMemo(() => messenger, [messenger]);
    return (
        <View style={styles.container}>
            <Divider />
            <SessionComponent padding={moderateScale(16)}>
                <RowComponent justifyContent={'space-between'} alignItems="center">
                    <IconButtonComponent
                        typeNoBackground
                        icon={<FontAwesome name='image' size={moderateScale(22)} color={Colors.COLOR_BTN_BLUE_PRIMARY} />}
                        onPress={() => { }} />
                    <TextInput
                        value={memoizedMessenger}
                        onChangeText={val => setMessenger(val)}
                        placeholder={placeholder}
                        style={[styles.input]}
                    />
                    <IconButtonComponent
                        typeNoBackground
                        icon={<FontAwesome name='send' size={moderateScale(22)} color={Colors.COLOR_BTN_BLUE_PRIMARY} />}
                        onPress={() => { }} />
                </RowComponent>
            </SessionComponent>
        </View>
    )
}

export default InputMessengerScreenComponent