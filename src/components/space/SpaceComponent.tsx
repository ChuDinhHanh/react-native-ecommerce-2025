import React from 'react';
import { DimensionValue, View } from 'react-native';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
}

export default function SpaceComponent(props: Readonly<Props>) {
  const { width, height, backgroundColor } = props;
  return <View style={{ width, height, backgroundColor }}></View>;
};
