import React, { memo, useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { styles } from './OTPInputComponent.style';

interface Props {
    id: number;
    onChange: (id: number, val: string) => void;
    isFocus: boolean;
    code: string;
    onFocus: (id: number) => void;
    isAutoCapitalize?: boolean;
}
const OTPInputComponent = (props: Props) => {
    const inputRef = useRef<TextInput>(null);
    const { isFocus, onChange, id, code, onFocus, isAutoCapitalize } = props;
    const [showLine, setShowLine] = useState<boolean>(true);
    const [shouldShowKeyboard, setShouldShowKeyboard] = useState(false);

    useEffect(() => {
        if (shouldShowKeyboard && inputRef.current) {
            inputRef.current.focus();
            setShouldShowKeyboard(false);
        }
    }, [shouldShowKeyboard]);

    useEffect(() => {
        if (inputRef?.current) {
            isFocus && setShouldShowKeyboard(true);
        }
    }, [isFocus]);

    const handleKeyPress = (e: any) => {
        if (e.nativeEvent.key === 'Backspace') {
            onChange(id, '');
        }
    };

    const handleOnFocus = () => {
        setShowLine(false);
        onFocus(id)
    }

    return (
        <View
            style={[
                {
                    backgroundColor: !showLine ? Colors.GREY_FEEBLE : Colors.WHITE,
                },
                styles.wrapper_input,
            ]}>
            <TextInput
                autoCapitalize={isAutoCapitalize ? 'characters' : 'none'}
                maxLength={2}
                onKeyPress={handleKeyPress}
                caretHidden={true}
                ref={inputRef}
                value={code}
                onChangeText={val =>
                    onChange(id, val.length === 0 ? val : val[val.length - 1])
                }
                onFocus={handleOnFocus}
                onBlur={() => setShowLine(true)}
                style={styles.input}
                selection={{ start: code.length, end: code.length }}
            />
            {showLine && !Boolean(code) && (
                <View
                    style={{
                        position: 'absolute',
                        width: 13.5,
                        height: 2,
                        backgroundColor: Colors.GREY_FEEBLE,
                    }}
                />
            )}
        </View>
    );
};

export default memo(OTPInputComponent);
