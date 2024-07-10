import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './DefaultAvatar.style';

interface Props {
    name: string;
    image?: string;
    size?: number;
}

const DefaultAvatar = (props: Props) => {
    const { name, image, size } = props;

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    return (
        <>
            {image ? (
                <Image
                    source={{ uri: image }}
                    style={[
                        styles.wrapperAvatar,
                        {
                            width: size ?? 40,
                            height: size ?? 40,
                        },
                    ]}
                />
            ) : (
                <View
                    style={[
                        styles.wrapperDefaultAvatar,
                        {
                            width: size ?? 40,
                            height: size ?? 40,
                            backgroundColor: generateColor(),
                        },
                    ]}>
                    <Text style={styles.wrapperName}>{name}</Text>
                </View>
            )}
        </>
    );
};

export default DefaultAvatar;
