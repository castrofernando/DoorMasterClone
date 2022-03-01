import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { StyleProp, TouchableOpacityProps, ViewStyle} from "react-native";

export const Container = styled.View`
    flex:1;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.colors.background};
`;

export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.medium};
    font-size: ${RFValue(20)}px;
    color: ${({theme})=>theme.colors.text};
`;

export const IconBorder = styled.TouchableOpacity`
    border: 10px solid ${({theme})=>theme.colors.primary};
    border-radius: ${RFValue(100)}px;
    margin-top: 50px;
`;

export const Icon = styled(Fontisto)`
    font-size: ${RFValue(62)}px;
    color: ${(props)=> props.abc};
    padding: ${RFValue(18)}px;
`;

