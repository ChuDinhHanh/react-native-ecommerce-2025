import React, { useEffect } from 'react';
import { LogBox, PermissionsAndroid, View } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import {
    Asset,
    CameraOptions,
    ImageLibraryOptions,
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';

const options = ['Camera', 'Gallery', 'Cancel'];

interface ImagePickerProps {
    optionsRef: (ref: ActionSheet | null) => void;
    onResult: (images: Asset[]) => void;
}

const ImagePicker = (props: ImagePickerProps) => {
    const { onResult, optionsRef } = props;

    useEffect(() => {
        LogBox.ignoreLogs([
            'Animated: `useNativeDriver`',
            'componentWillReceiveProps',
        ]);
    }, []);

    const handlePress = async (index: number) => {
        if (index === 0) {
            const options: CameraOptions = {
                mediaType: 'photo',
                cameraType: 'back',
                quality: 1,
                // saveToPhotos: true,
            };

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    launchCamera(options, (res: ImagePickerResponse) => {
                        if (res.assets) {
                            onResult(res.assets);
                        }
                    });
                    console.log('Camera permission oke');
                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else if (index === 1) {
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                quality: 1,
                selectionLimit: 50,
            };

            launchImageLibrary(options, (res: ImagePickerResponse) => {
                if (res.assets) {
                    onResult(res.assets);
                }
            });
        }
    };

    return (
        <View>
            <ActionSheet
                ref={ref => {
                    optionsRef(ref);
                }}
                options={options}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={handlePress}
            />
        </View>
    );
};

export default ImagePicker;