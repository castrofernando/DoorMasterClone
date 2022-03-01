import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import Toast from 'react-native-root-toast'

//BLE Imports
import { BleManager, Device } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import * as ble from '../../global/bleData';

import * as Progress from 'react-native-progress';
import { Buffer } from "buffer";

import {
    Container,
    Title,
    IconBorder,
    Icon,
} from './styles';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";


const manager = new BleManager();

export function OpenKey({route}){


    const rotateAnimation = useRef(new Animated.Value(0)).current;
    const [bleColor,setBleColor] = useState(false);

    const handleAnimation = async () => {   
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          rotateAnimation.setValue(0);
        });
      };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });
      
    const animatedStyle = {
        transform: [
          {
            rotate: interpolateRotating,
          },
        ],
      };

    async function handleUnlock(){
      if(bleColor){
        handleAnimation();
          Toast.show('Requesting to open door - Wait....', {     
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          containerStyle: {
            height: RFValue(120),
            width: RFValue(250),
            borderRadius: 20,
          },
          opacity: 0.8
        });
        
        await handleOpen();
      }else{
        Toast.show('Device not found. Are you near enough?', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          containerStyle: {
            height: RFValue(120),
            width: RFValue(250),
            borderRadius: 20,
          },
          opacity: 0.8
        });
      }

      

        // Add a Toast on screen.

    }

   async function scanAndConnect() {
      setBleColor(false); 
      await ble.requestLocationPermission();
      console.log('scanning');
        manager.startDeviceScan([ble.serviceUUID], null, (error, device) => {
         
            if (error) {
                console.log(error);
                // Handle error (scanning will be stopped automatically)
                return
            }           
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            //console.log(`${device.id.trim()} <-> ${route.params.device.macAddress.trim()}`)
            if (device.id.trim() == deviceData?.macAddress.trim()) {               
                // Stop scanning as it's not necessary if you are scanning for one device.
                console.log(`achou no scanning ${device.id}`);   
                setBleColor(true);
                manager.stopDeviceScan();                 
            }           
        });
    }



    async function handleOpen(){
      let device:Device;
      manager.stopDeviceScan(); 
      try{
          if(await manager.isDeviceConnected(deviceData?.macAddress.trim())){
            device = await manager.discoverAllServicesAndCharacteristicsForDevice(deviceData?.macAddress.trim());
          }else{
            device = await manager.connectToDevice(deviceData?.macAddress.trim());
            console.log('reading all services and characteristics');
            device = await device.discoverAllServicesAndCharacteristics();
          }
          if(device){         
            console.log('ble connected');
            if(device){
            let char = await device.readCharacteristicForService(ble.serviceUUID,ble.characteristicUUID);
            console.log(base64.decode(char.value));          
            await device.writeCharacteristicWithoutResponseForService(ble.serviceUUID,ble.characteristicUUID,base64.encode("A"));
            Toast.show('DOOR UNLOCKED!', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              shadow: true,
              animation: true,
              hideOnPress: true,
              containerStyle: {
                height: RFValue(120),
                width: RFValue(250),
                borderRadius: 20,
              },
              opacity: 0.8
            });
            console.log('OPA');
            }
          }  
      }catch(error){  
        console.log(error);
      }
      
    }

    let deviceData = route.params.deviceData;
    useFocusEffect(
      useCallback(()=>{
        console.log('Entrei na tela');
        deviceData = route.params.deviceData;
        console.log(deviceData);
        const subscription = manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                scanAndConnect();             
                const disconnectedDev = manager.onDeviceDisconnected(deviceData.macAddress, (error, device) => {
                  console.log(`Device disconnected: ${error} - ${device.id}`);                 
                });    
                disconnectedDev.remove(); 
            }
        }, true);
        return () => {
          manager.stopDeviceScan();         
          subscription.remove();        
          console.log("saiu");
        }
      },[route])
      
    )


    
    return (
        <Container>
          {
            deviceData ?            
            <>
            <Title>{deviceData?.name} - {deviceData?.macAddress}</Title>          
            <Animated.View>
                <IconBorder style={animatedStyle} onPress={async () => handleUnlock()}>
                    <Icon name="key" abc={bleColor ? theme.colors.primary : '#FF0000'}/>   
                </IconBorder>
            </Animated.View></> : <Title>No key selected</Title>
          }   
        
        </Container>
    );
}