import { PermissionsAndroid } from "react-native";

const serviceUUID = '96C2A890-85F4-11EC-A8A3-0242AC120002';
const characteristicUUID = '96C2A891-85F4-11EC-A8A3-0242AC120002';
const notifyUUID = '96C2A892-85F4-11EC-A8A3-0242AC120002';

async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
          title: 'Location permission for bluetooth scanning',
          message: 'wahtever',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ); 
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission for bluetooth scanning granted');
        return true;
      } else {
        console.log('Location permission for bluetooth scanning revoked');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  

export {serviceUUID,characteristicUUID,notifyUUID,requestLocationPermission};