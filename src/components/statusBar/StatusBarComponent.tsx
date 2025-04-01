import * as React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';

export default function StatusBarComponent(props: Readonly<StatusBarProps>) {
  return <StatusBar {...props} />;
}
