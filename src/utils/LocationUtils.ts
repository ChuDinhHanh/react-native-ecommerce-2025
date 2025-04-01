export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number,
) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};
