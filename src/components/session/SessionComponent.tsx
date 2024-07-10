import { View, Text, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    padding?: number;
    paddingNotTop?: Boolean;
    backgroundColor?: string;
    paddingHorizontal?: number;
}
const SessionComponent = (props: Props) => {
    const { children, padding, paddingNotTop, backgroundColor, paddingHorizontal } =
        props;
    return (
        <View
            style={{
                padding: padding ?? 16,
                paddingTop: paddingNotTop && 0,
                backgroundColor,
                paddingHorizontal,
            }}>
            {children}
        </View>
    );
};

export default SessionComponent;
