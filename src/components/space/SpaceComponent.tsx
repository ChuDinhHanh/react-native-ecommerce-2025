import React from 'react';
import { View } from 'react-native';

interface Props {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export default function SpaceComponent(props: Readonly<Props>) {
  const { width, height, backgroundColor } = props;
  return <View style={{ width, height, backgroundColor }}></View>;
};
