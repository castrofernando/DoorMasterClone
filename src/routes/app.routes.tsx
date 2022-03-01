import React from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Login } from "../screens/Login";
import { OpenKey } from "../screens/OpenKey";
import { Device } from "../screens/Device";
import { Setting } from "../screens/Setting";
import { useAuth } from "../hooks/AuthContext";
import { setStatusBarBackgroundColor, setStatusBarStyle, StatusBar } from "expo-status-bar";
import {MaterialIcons} from '@expo/vector-icons';
import theme from "../global/styles/theme";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { BleTest } from "../components/BleTest";
import { RFPercentage } from "react-native-responsive-fontsize";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function Home(){
    return (

        <Tabs.Navigator 
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                headerShown:false,
                tabBarStyle: {
                    paddingVertical: Platform.OS == 'ios' ? 20: 0,
                }
            }}
        >
            <Tabs.Screen
                name="Device"
                component={Device}
                options={{
                    headerShown:false,
                    tabBarIcon: (({size,color})=> 
                        <MaterialIcons 
                            name="device-hub" 
                            size={32} 
                            color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="OpenKey"
                component={OpenKey}
                options={{
                    headerShown:false,
                    tabBarLabel: 'Open Door',
                    tabBarIcon: (({size,color})=> 
                        <MaterialIcons 
                            name="vpn-key" 
                            size={32} 
                            color={color} />
                    )
                }}
                initialParams={{}}
            />
            <Tabs.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: (({size,color})=> 
                    <MaterialIcons 
                        name="settings" 
                        size={32} 
                        color={color}
                        />
                )
                }}
            />        
        </Tabs.Navigator>          
    );
}

function Authenticate(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={Login}
                options={{
                    headerBackTitleVisible: false,
                    headerShown: false
                }}/>
        </Stack.Navigator>
    )
}

function BleScreen(){
    return (
        <Stack.Navigator >
        <Stack.Screen
            name="Tabs"
            component={Home}
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen
            name="BLE"
            component={BleTest}
            options={{
                headerBackTitleVisible: true,
                headerShown: true,
              
            }}
        />
        
    </Stack.Navigator>
    )
   
}

export function AppRoutes(){
    
    const {user} = useAuth();
    console.log(user);
    
    if(!user){

        return <Authenticate/>; 
    }else{
        if(user.isVerified){
            return <BleScreen/>
        }else{
            return <Authenticate />
        }

    }
}