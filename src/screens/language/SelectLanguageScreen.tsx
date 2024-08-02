import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { setTranslations } from 'react-multi-lang'
import { FlatList } from 'react-native'
import ContainerComponent from '../../components/container/ContainerComponent'
import SessionComponent from '../../components/session/SessionComponent'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import { saveLanguage } from '../../redux/userThunks'
import { RootStackParamList } from '../../routes/Routes'
import en from '../../translate/en.json'
import jp from '../../translate/jp.json'
import vi from '../../translate/vi.json'
import SelectLanguageScreenItemCountry from './component/item/SelectLanguageScreenItemCountry'
import { Variables } from '../../constants/Variables'
setTranslations({ jp, en, vi })


const SelectLanguageScreen = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const language = useAppSelector((state) => state.SpeedReducer.language);
    const [data, setData] = useState([
        {
            id: 1,
            flag: require('../../assets/images/data/selectLanguges/vnFlag.png'),
            countryName: 'Việt Nam',
            code: Variables.DEFAULT_LANGUAGE,
            isSelected: language === Variables.DEFAULT_LANGUAGE

        },
        {
            id: 2,
            flag: require('../../assets/images/data/selectLanguges/ukFlag.png'),
            countryName: 'Anh - Mỹ',
            code: 'en',
            isSelected: language === 'en'

        },
        {
            id: 3,
            flag: require('../../assets/images/data/selectLanguges/jpFlag.png'),
            countryName: 'Nhật Bản',
            code: 'jp',
            isSelected: language === 'jp'

        },
    ])
    const handleSubmitEvent = (id: number) => {
        const newData = data.map((item: any) => {
            if (item.id === id) {
                item.isSelected = true
                dispatch(saveLanguage({ code: item.code }));
            } else {
                item.isSelected = false
            }
            return item
        })
        setData(newData);
        navigation.goBack();
    }

    return (
        <ContainerComponent
            isFull
            isScrollEnable
            backgroundColor={'transparent'}
        >
            <SessionComponent>
                <FlatList
                    scrollEnabled={false}
                    data={data}
                    renderItem={({ item }) => (
                        <SelectLanguageScreenItemCountry
                            key={item.id}
                            id={item.id}
                            flag={item.flag}
                            countryName={item.countryName}
                            isSelected={item.isSelected}
                            onSubmit={handleSubmitEvent}
                        />
                    )}
                />
            </SessionComponent>
        </ContainerComponent>
    )
}

export default SelectLanguageScreen