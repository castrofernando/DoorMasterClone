import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import {Feather, Entypo } from "@expo/vector-icons";
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
    flex:1;
    background-color: ${({theme})=> theme.colors.background};
    padding-top: ${getStatusBarHeight() + 10}px;
    padding-bottom: ${getBottomSpace() + 10}px;
    align-items: center;
    justify-content: center;
`;

export const AcoountWrapper = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({theme})=> theme.colors.rowButton};
    padding: 10px 20px;
    margin-bottom: 8px;
`;

export const AccountIcon = styled(Entypo)`
    color: ${({theme})=>theme.colors.text};
    font-size: ${RFValue(52)}px;
`;

export const ButtonWrapper = styled.View`
    flex-direction:row;
    align-items: center;
`;

export const Title = styled.Text`
    color: ${({theme})=>theme.colors.text};
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)`
    color: ${({theme})=>theme.colors.background};
    font-size: ${RFValue(28)}px;
`;

export const ExitButton = styled.TouchableOpacity`
    border: 7px solid ${({theme})=>theme.colors.primary};
    border-radius: ${RFValue(100)}px;
    margin-top: 10px;
`;

export const ExitLabel = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(24)}px;
    color: ${({theme})=>theme.colors.primary};
    padding: ${RFValue(32)}px ${RFValue(25)}px;
`;