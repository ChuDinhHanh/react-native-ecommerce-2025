import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Text } from 'react-native';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import { Colors } from '../../../../constants/Colors';
import { Variables } from '../../../../constants/Variables';
import { moderateScale, verticalScale } from '../../../../utils/ScaleUtils';

interface Props {
    data: any;
    productClassifyCodes?: string[];
    onPress: (codeOption: string[], qtyOption: number) => void
}

type DataOption = {
    groupName: string;
    data: {
        name: string,
        code: string,
        priceAfterIncreasePercent: number,
    }[]
}

type SelectOption = {
    groupName: string
    option: string
}

const SelectOptionProductComponent = (props: Props) => {
    const { data, onPress, productClassifyCodes } = props;
    const [dataOption, setDataOption] = useState<DataOption[]>();
    const [optionSelectData, setOptionSelectData] = useState<SelectOption[]>([]);

    useEffect(() => {
        const result = optionSelectData.map((item: SelectOption) => (item.option));
        onPress(result, dataOption?.length ?? 0);
    }, [optionSelectData]);

    const handleCheckSelectOptionByName = (select: SelectOption, prevData: SelectOption[]) => {
        return prevData.findIndex((item: SelectOption) => item.groupName == select.groupName);
    }

    const handleAddOption = useCallback((select: SelectOption) => {
        setOptionSelectData((prev) => {
            const index = handleCheckSelectOptionByName(select, prev);
            if (index == -1) {
                return [...prev, select];
            } else {
                const newData = [...prev];
                newData[index] = select;
                return newData;
            }
        })
    }, [handleCheckSelectOptionByName]);


    useEffect(() => {
        const newData = data.filter((item: any) => (productClassifyCodes?.includes(item.code)));
        newData.forEach((item: any) => {
            handleAddOption({
                groupName: item.groupName,
                option: item.code
            })
        })
    }, [productClassifyCodes])

    useMemo(() => {
        if (data) {
            const dataTemple: DataOption[] = [];
            const currentNameGroup = [''];
            data.map((item1: any) => {
                if (!currentNameGroup.includes(item1.groupName)) {
                    dataTemple.push({
                        groupName: item1.groupName,
                        data: [{
                            name: item1.name,
                            code: item1.code,
                            priceAfterIncreasePercent: item1.priceAfterIncreasePercent
                        }]
                    })
                }
                else {
                    dataTemple.map((item2: any) => {
                        if (item2.groupName == item1.groupName) {
                            item2.data = [
                                ...item2.data, {
                                    name: item1.name,
                                    code: item1.code,
                                    priceAfterIncreasePercent: item1.priceAfterIncreasePercent
                                }
                            ]
                        }
                    })
                }
                currentNameGroup.push(item1.groupName);
            })
            setDataOption(dataTemple);
        }
    }, [data]);

    const handlePrintOptions = useMemo(() => (
        dataOption ? <>
            {
                dataOption.map((item1: any, index: number) => (
                    <>
                        <TextComponent text={item1.groupName} color={Colors.BLACK} />
                        <SpaceComponent height={verticalScale(10)} />
                        <FlatList
                            scrollEnabled={false}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            key={index.toString()}
                            data={item1.data}
                            renderItem={({ item, index }) => (
                                <TextButtonComponent
                                    key={index}
                                    borderRadius={3}
                                    marginRight={moderateScale(10)}
                                    paddingVertical={verticalScale(5)}
                                    borderWidth={2}
                                    borderColor={optionSelectData.findIndex(_item => _item.option === item.code) != -1 ? Colors.GREEN_500 : Colors.GREY1}
                                    paddingHorizontal={moderateScale(20)}
                                    title={<TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text={item.name} color={Colors.BLACK} />}
                                    onPress={() => handleAddOption({
                                        groupName: item1.groupName,
                                        option: item.code
                                    })}
                                />
                            )}
                        />
                    </>
                ))
            }
        </> : null
    ), [dataOption, optionSelectData]);


    return (
        handlePrintOptions
    )
}

export default memo(SelectOptionProductComponent)