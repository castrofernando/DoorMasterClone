import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList } from 'react-native';

interface DeviceProps{
    id: string;
    name: string;
    iconName: string;
    status: 'Online' | 'Offline';
    edit: () => void;
    delete: () => void;
}

export const Container = styled.View`
    flex:1;
    background-color: ${({theme}) => theme.colors.background};   
    justify-content: center;
    padding-top: ${getStatusBarHeight() + 20}px;
    padding-bottom:${getBottomSpace()}px;
`;

export const ListWrapper = styled(
    FlatList as new () => FlatList<DeviceProps>)`
    padding: 0px 20px;
    background-color: ${({theme}) => theme.colors.background};   
    
`;

