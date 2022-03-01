import React, { useEffect, useState } from "react";
import {View, Text, Alert, DeviceEventEmitter} from "react-native";
import { BleManager, Device } from 'react-native-ble-plx';
import { PermissionsAndroid } from "react-native";
import theme from "../../global/styles/theme";
import { GestureHandlerRootView,RectButton } from "react-native-gesture-handler";
import base64 from 'react-native-base64'

export function BleTest(){

    const serviceUUID = '96C2A890-85F4-11EC-A8A3-0242AC120002';
    const characteristicUUID = '96C2A891-85F4-11EC-A8A3-0242AC120002';
    const notifyUUID = '96C2A892-85F4-11EC-A8A3-0242AC120002';
    
    const manager = new BleManager();
    const [devices,setDevices] = useState<Device[]>([]);
    const [deviceConnected,setDeviceConnected] = useState<Device>();
  

    async function handleOpen(device: Device){
      try{
        if( await device.isConnected()){
          await device.writeCharacteristicWithoutResponseForService(serviceUUID,characteristicUUID,base64.encode("A"));
        }else{
          let dev = await device.connect({
            autoConnect:false
          });
          if(dev){
            
            console.log('ble connected');
            console.log('reading all services and characteristics');
            dev = await dev.discoverAllServicesAndCharacteristics();
            if(dev){
            const s = dev.monitorCharacteristicForService(serviceUUID,notifyUUID,(e,c) => {

              console.log('Entrei aqui');
              if(c){
                console.log(`Notify: ${base64.decode(c.value)}`);
              }

            });
            const ss = dev.onDisconnected((e,d)=> {
              s.remove();
              console.log('foi desconectado');
              ss.remove();
            });
            console.log('passei');
            await dev.writeCharacteristicWithoutResponseForService(serviceUUID,characteristicUUID,base64.encode("A"));
            }
          }
        }
        
      }catch(error){
        handleOpen(device);
        console.log(error);
      }
    }

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

    async function scanAndConnect() {
        manager.startDeviceScan(['96C2A890-85F4-11EC-A8A3-0242AC120002'], null, (error, device) => {
            if (error) {
                console.log(error);
                // Handle error (scanning will be stopped automatically)
                return
            }
    
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'ACS9090' || 
                device.name === 'SensorTag') {
                
                // Stop scanning as it's not necessary if you are scanning for one device.
                manager.stopDeviceScan();  
                setDevices([...devices,device]);  
                // Proceed with connection.
            }  
        });
    }

    useEffect(()=>{
        requestLocationPermission();
        const subscription = manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                scanAndConnect();             
                subscription.remove();            
            }
        }, true);
        return () => {
          subscription.remove();
        }
    },[]);

    return (    
            <View style={{flex:1,justifyContent:"center",alignItems:"center", backgroundColor:'#ff0000'}}>
                {
                    devices.map((dev) => {
                        return (
                            <GestureHandlerRootView key={dev.id}>
                              <RectButton style={{width:250,padding:30, backgroundColor: theme.colors.primary}} onPress={() => handleOpen(dev)}>                          
                                <View style={{flexDirection:'row'}} key={dev.id} >
                                    <Text>{dev.id}</Text>
                                    <Text>{dev.name}</Text>
                                    <Text>{dev.rssi}</Text>
                                </View>
                              </RectButton>
                            </GestureHandlerRootView>
                                           
                        )                      
                    })
                }
            </View>
        
    )
}