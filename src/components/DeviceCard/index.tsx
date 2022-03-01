import React from "react";
import DeviceIcon from '../../assets/door-device.svg';
import { RFValue } from "react-native-responsive-fontsize";
import {ViewProps} from 'react-native';

import {
    Container,
    DeviceInfo,
    Name,
    Status,
    Link,
    IconStatus,
    Actions,
    Edit,
    Remove,
} from './styles';
import { TouchableOpacity } from "react-native";

interface DeviceProps extends ViewProps{
    id: string;
    macAddress: string;
    name: string;
    isOnline?: boolean;
    lastestData?: Date;  
    userId: string;
}

interface Props{
    data: DeviceProps;
    edit: () =>void;
    remove: () =>void;
    onPress: () =>void;
}

export function DeviceCard({data,edit,remove,onPress,...rest}:Props){

    return (
        <Container onPress={onPress} {...rest}>
            <DeviceIcon 
                 width={RFValue(42)}
                 height={RFValue(42)}
            />
            <DeviceInfo>
                <Name>{data.name}</Name>
                <Status>{data.macAddress}</Status>
                <Link>
                    <Status >{data.isOnline? 'Online' : 'Offline'}</Status>
                    <IconStatus name='globe' color={data.isOnline? 'green' : 'red'}/>             
                </Link>
            </DeviceInfo>
            <Actions>
                <TouchableOpacity onPress={edit}>
                    <Edit name="edit" />
                </TouchableOpacity>
                <TouchableOpacity onPress={remove}>
                    <Remove name="trash" />
                </TouchableOpacity>
                
            </Actions>
        </Container>
    );
}