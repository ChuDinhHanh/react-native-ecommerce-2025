import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  body: {
    borderTopWidth: 20,
    borderTopColor: '#e0e0e0',
    padding: 15,
  },
  textName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    marginTop: 5,
  },
  textEmail: {
    color: '#000',
    marginTop: 2,
    fontSize: 14,
    marginBottom: 5,
  }
});
