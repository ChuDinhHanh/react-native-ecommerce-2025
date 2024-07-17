module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // plugins: ['nativewind/babel', 'react-native-paper/babel'],
  plugins: [
    'nativewind/babel',
    'react-native-paper/babel',
    ['import', {libraryName: '@ant-design/react-native'}],
  ],
};
