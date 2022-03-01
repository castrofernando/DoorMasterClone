import React, { StyleSheet, View, StatusBar,TouchableOpacity,Text, Modal,Alert } from 'react-native';

import {
    Container,
    ListWrapper
} from './styles';


import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../global/styles/theme';
import { DeviceCard } from '../../components/DeviceCard';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";

import { getBottomSpace } from 'react-native-iphone-x-helper'; 

import QRCodeScanner from 'react-native-qrcode-scanner';
import SvgScanQr from '../../assets/scan-qr.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import { AddDevice } from '../../components/AddDevice';
import { useAuth } from '../../hooks/AuthContext';
import AwesomeAlert  from 'react-native-awesome-alerts';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

interface DeviceProps{
    id: string;
    macAddress: string;
    name: string;
    isOnline?: boolean;
    lastestData?: Date;  
}

export function Device(){

    const {user} = useAuth();
    const navigation = useNavigation();
    const [devices,setDevices] = useState<DeviceProps[]>([]);
    const [scan, setScan] = useState(false);
    const [result, setResult] = useState();
    const [addModal,setAddModal] = useState(false);
    const [device,setDevice] = useState<DeviceProps>();
    const [refreshing, setRefreshing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    function onSuccess(e){
        setResult(e.data);
        console.log(e.data);
        if(e.data){
            //FORMAT: NAME@MAC
            const array = e.data.split('@',2);
            console.log(array[0]);
            console.log(array[1]);
            setDevice({
                name: array[0],
                macAddress: array[1],
                id: ''
            })
        }
        setIsEditing(false);
        setAddModal(true);
        setScan(false);
      }
    
     function startScan(){
        setScan(true)
        setResult(null);
      }

    async function handleAdd(){
        setIsEditing(false);
        setDevice(null);
        setAddModal(true);
    }  

    function handleEdit(item:DeviceProps){
        setIsEditing(true);
        setDevice(item);
        setAddModal(true);      
    }

    async function handleRemove(item:DeviceProps){
        Alert.alert('Remove device',`Do you want remove ${item?.name}?`, [
            {
                text: 'Yes',
                style: "destructive",
                onPress: (d)=> {remove(item.id)}
            },
            {
                text: 'No',
                style: "default",
                onPress: ()=> {}
            }
        ])
    }

    async function remove(id: string){
       try{
        firestore()
        .collection('Device')
        .doc(id)
        .delete().then(() => {
            Toast.show({
                autoHide: true,
                text1: `Device was removed successfully!`,
                visibilityTime: 1500,
                type: 'success'
            });
        });
       }catch(error){
        Toast.show({
            autoHide: true,
            text1: `Device was removed successfully!`,
            visibilityTime: 2500,
            type: 'error'
        });
       }  
    }

    async function listDevices(){
        try{
            const subscribe = firestore()
        .collection('Device')
        .where('user.id', '==', user.id)
        .orderBy('name')
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }) as DeviceProps[];
            setDevices(data);
            //console.log(data);
        }, error => {
            console.log(error);
        });

        return () => subscribe();
        }catch(error){
            console.log(error);
        }
        
    }

    function handleRefresh(){
        setRefreshing(true);
        console.log('refreshing');
        setRefreshing(false);
    }

    function handleUnlock(item: DeviceProps){

        navigation.navigate('OpenKey',{deviceData: item});
    }

    useEffect(()=>{
        listDevices();
    },[]);

    useFocusEffect(()=>{
      
      });

    return (
        <Container>         
            <ListWrapper 
                data={devices}       
                keyExtractor={item => item.id}
                renderItem={({ item }) => <DeviceCard onPress={() => handleUnlock(item)} data={item} edit={() => handleEdit(item)} remove={() => handleRemove(item)}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: getBottomSpace()
                  }}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
            />
                 

       

            {/*Rest of App come ABOVE the action button component!*/}
            <ActionButton buttonColor="rgba(26,150,212,1)" position='right' outRangeScale='1.1' btnOutRange="rgba(26,150,212,.7)">
                <ActionButton.Item buttonColor={theme.colors.primary} title="Scan QrCode" onPress={startScan}>
                <Icon name="qr-code-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor={theme.colors.primary} title="Add" onPress={handleAdd}>
                <Icon name="add-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
             
             <Modal onRequestClose={() => setScan(false)} visible={scan}>
             <QRCodeScanner   
                    containerStyle={{backgroundColor: theme.colors.primary}}    
                  reactivate={true}
                  showMarker={true}
                  customMarker={
                        <View style={styles.rectangleContainer}>                   
                           <SvgScanQr width={250} height={250} fill={'rgba(1,1,1,0.2)'}/>
                        </View>      
                  }                
                  onRead={onSuccess}
                  topContent={
                    <View style={styles.topCamera}>
                        <Text style={styles.text}>Scan the device Qrcode</Text>
                    </View>
                  }
                  bottomContent={
                    <View style={styles.bottomCamera}>
                    <TouchableOpacity style={styles.buttonCam}  onPress={() => setScan(false)}>
                      <Text style={styles.text}>Back</Text>
                    </TouchableOpacity>
                    </View>
                  }
                />
             </Modal>
             <Modal visible={addModal} onRequestClose={() => setAddModal(false)}>
                  <AddDevice device={device} isEditing={isEditing} close={() => setAddModal(false)} />
             </Modal>

            <Toast />
        </Container>
       
      );
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: theme.colors.secundary,
    },
    text:{
        fontFamily: theme.fonts.medium,
        fontSize: 18,
        color: theme.colors.secundary,
    },
    buttonCam:{
        flexDirection: 'row',
        justifyContent: 'center',
        width: 80,
        height: 80,
        alignItems: 'center',
        borderRadius: 50,
        borderColor: theme.colors.secundary,
        borderStyle: 'solid',
        borderWidth: 5,
        backgroundColor: theme.colors.primary
    },
    bottomCamera:{
        flex:1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    topCamera:{
        flex:1,
        margin: 0,
        padding: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
    rectangleContainer: {    
        alignItems: 'center',
        justifyContent: 'center',
    
      },

  });