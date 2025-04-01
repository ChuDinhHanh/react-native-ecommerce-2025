import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {moderateScale, verticalScale} from '../../../../utils/ScaleUtils';

interface Props {
  data: Array<{
    groupName: string;
    name: string;
    code: string;
    priceAfterIncreasePercent: number;
  }>;
  productClassifyCodes?: string[];
  onPress: (codeOption: string[], qtyOption: number) => void;
}

type DataOption = {
  groupName: string;
  data: {
    name: string;
    code: string;
    priceAfterIncreasePercent: number;
  }[];
};

type SelectOption = {
  groupName: string;
  option: string;
};

const SelectOptionProductComponent = ({
  data,
  onPress,
  productClassifyCodes,
}: Props) => {
  const [dataOption, setDataOption] = useState<DataOption[]>([]);
  const [optionSelectData, setOptionSelectData] = useState<SelectOption[]>([]);

  useEffect(() => {
    const selectedOptions = optionSelectData.map(item => item.option);
    onPress(selectedOptions, dataOption.length);
  }, [optionSelectData]);

  const handleCheckSelectOptionByName = (
    select: SelectOption,
    prevData: SelectOption[],
  ) => prevData.findIndex(item => item.groupName === select.groupName);

  const handleAddOption = useCallback(
    (select: SelectOption) => {
      setOptionSelectData(prev => {
        const index = handleCheckSelectOptionByName(select, prev);
        if (index === -1) {
          return [...prev, select];
        } else {
          const updatedData = [...prev];
          updatedData[index] = select;
          return updatedData;
        }
      });
    },
    [handleCheckSelectOptionByName],
  );

  useEffect(() => {
    if (productClassifyCodes && data.length) {
      const selectedOptions = data
        .filter(item => productClassifyCodes.includes(item.code))
        .map(item => ({groupName: item.groupName, option: item.code}));
      setOptionSelectData(selectedOptions);
    }
  }, [productClassifyCodes, data]);

  useEffect(() => {
    if (data) {
      const groupedData = data.reduce((acc: DataOption[], item) => {
        const existingGroup = acc.find(
          group => group.groupName === item.groupName,
        );
        if (existingGroup) {
          existingGroup.data.push({
            name: item.name,
            code: item.code,
            priceAfterIncreasePercent: item.priceAfterIncreasePercent,
          });
        } else {
          acc.push({
            groupName: item.groupName,
            data: [
              {
                name: item.name,
                code: item.code,
                priceAfterIncreasePercent: item.priceAfterIncreasePercent,
              },
            ],
          });
        }
        return acc;
      }, []);
      setDataOption(groupedData);
    }
  }, [data]);

  const handlePrintOptions = useMemo(() => {
    if (!dataOption.length) return null;

    return dataOption.map((item1, index) => (
      <View key={item1.groupName + index}>
        <TextComponent text={item1.groupName} color={Colors.BLACK} />
        <SpaceComponent height={verticalScale(10)} />
        <FlatList
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item1.data}
          keyExtractor={item => item.code}
          renderItem={({item}) => (
            <TextButtonComponent
              borderRadius={3}
              marginRight={moderateScale(10)}
              paddingVertical={verticalScale(5)}
              borderWidth={2}
              borderColor={
                optionSelectData.some(opt => opt.option === item.code)
                  ? Colors.GREEN_500
                  : Colors.GREY1
              }
              paddingHorizontal={moderateScale(20)}
              title={
                <TextComponent
                  fontSize={Variables.FONT_SIZE_ERROR_TEXT}
                  text={item.name}
                  color={Colors.BLACK}
                />
              }
              onPress={() =>
                handleAddOption({
                  groupName: item1.groupName,
                  option: item.code,
                })
              }
            />
          )}
        />
      </View>
    ));
  }, [dataOption, optionSelectData, handleAddOption]);

  return handlePrintOptions;
};

export default memo(SelectOptionProductComponent);
