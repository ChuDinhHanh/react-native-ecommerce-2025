import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {IconButton} from 'react-native-paper';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {moderateScale} from '../../../../utils/ScaleUtils';
import LoadingComponent from '../../../../components/loading/LoadingComponent';
import {getAddressFromCoordinates} from '../../../../utils/LocationUtils';

interface Place {
  lat: string;
  lon: string;
  display_name: string;
}

interface SelectedPlace {
  latitude: number;
  longitude: number;
}

interface PlaceItem {
  place_id: string;
  display_name: string;
  lat: number;
  lon: number;
}

interface LocationMark {
  latitude: number;
  longitude: number;
}

export interface LocationMarkAndAddress extends LocationMark {
  address: string;
}

interface Props {
  onPress: (locationMarkAndAddress: LocationMarkAndAddress) => void;
}
const MapComponent = (props: Props) => {
  const {onPress} = props;
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace>();
  const [selectedLocation, setSelectedLocation] = useState<LocationMark | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleLongPress = (event: any) => {
    const {coordinate} = event.nativeEvent;
    setSelectedLocation(coordinate);
    getAddressFromCoordinates(coordinate.latitude, coordinate.longitude)
      .then(address => setQuery(address))
      .catch(error => console.error(error));
  };

  const searchPlaces = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: query,
            format: 'json',
            addressdetails: 1,
            limit: 8,
          },
        },
      );
      setPlaces(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handlePlaceSelect = (place: Omit<PlaceItem, 'place_id'>) => {
    setSelectedPlace({
      latitude: parseFloat(place.lat + ''),
      longitude: parseFloat(place.lon + ''),
    });
    setQuery(place.display_name);
    setPlaces([]);
  };

  // Get current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setSelectedLocation({latitude, longitude});
        getAddressFromCoordinates(latitude, longitude)
          .then(address => setQuery(address))
          .catch(error => console.error('Error fetching address:', error));
      },
      error => console.error('Geolocation error:', error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        onPress={handleLongPress}
        onLongPress={handleLongPress}
        style={{flex: 1}}
        region={{
          latitude: selectedPlace?.latitude || 37.78825,
          longitude: selectedPlace?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      {/* Search */}
      <View style={styles.searchContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: moderateScale(45),
              flex: 1,
              backgroundColor: Colors.WHITE,
              borderWidth: 0.5,
              borderColor: '#ccc',
              borderRadius: 999,
            }}>
            <TextInput
              placeholder="Search"
              value={query}
              onChangeText={setQuery}
              style={styles.input}
            />
            {query && (
              <IconButton
                containerColor={Colors.WHITE}
                onPress={() => setQuery('')}
                icon={'close'}
              />
            )}
          </View>
          <IconButton
            style={{alignSelf: 'flex-end'}}
            containerColor={Colors.WHITE}
            onPress={searchPlaces}
            icon={'magnify'}
          />
        </View>
        <View style={styles.resultsContainer}>
          <FlatList
            data={places}
            keyExtractor={item => item.place_id}
            renderItem={({item}) => (
              <Text
                style={styles.resultItem}
                onPress={() => handlePlaceSelect(item)}>
                {item.display_name}
              </Text>
            )}
          />
        </View>
      </View>
      {/* Confirm */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <IconButton
          style={{
            alignSelf: 'flex-end',
            borderWidth: 1,
            position: 'absolute',
            right: moderateScale(10),
            bottom: 100,
          }}
          containerColor={Colors.WHITE}
          onPress={getCurrentLocation}
          icon={'crosshairs-gps'}
        />
        <TextButtonComponent
          padding={moderateScale(15)}
          borderRadius={5}
          backgroundColor={Colors.GREEN_500}
          marginHorizontal={16}
          marginVertical={16}
          title={
            <TextComponent
              fontWeight="bold"
              fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
              color={Colors.WHITE}
              text={'Xác nhận địa điểm giao hàng'}
            />
          }
          onPress={() => {
            if (selectedLocation) {
              onPress({
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                address: query,
              });
            } else {
              Alert.alert('Please select location');
            }
          }}
        />
      </View>
      {isLoading && (
        <LoadingComponent
          title={'Đang tìm kiếm địa điểm...'}
          size={Variables.FONT_SIZE_ERROR_TEXT}
          color={Colors.WHITE}
          icon={''}
          iconSize={moderateScale(25)}
          iconColor={Colors.GREEN_500}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderBottomColor: '#ccc',
    position: 'absolute',
    top: 0,
    width: '100%',
    alignSelf: 'center',
    padding: 5,
  },
  input: {
    paddingLeft: 10,
    flex: 1,
  },
  resultsContainer: {
    backgroundColor: Colors.WHITE,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MapComponent;
