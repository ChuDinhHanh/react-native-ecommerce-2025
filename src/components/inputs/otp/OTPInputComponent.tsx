import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

interface Props {
    id: number;
    onChange: (id: number, val: string) => void;
    isFocus: boolean;
    code: string;
    onFocus: (id: number) => void;
}
const OTPInputComponent = (props: Props) => {
    const inputRef = useRef<TextInput>(null);
    const { isFocus, onChange, id, code, onFocus } = props;
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
                onKeyPress={handleKeyPress}
                caretHidden={true}
                ref={inputRef}
                value={code}
                keyboardType="numeric"
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

const styles = StyleSheet.create({
    wrapper_input: {
        overflow: 'hidden',
        width: 55,
        height: 55,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.GREY_FEEBLE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        textAlign: 'center',
        fontSize: 18,
        width: '100%',
        height: '100%',
    },
});
export default memo(OTPInputComponent);
