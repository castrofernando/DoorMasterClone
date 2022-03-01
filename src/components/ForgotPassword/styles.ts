import styled from "styled-components/native";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(GestureHandlerRootView)`
    flex:1;
    background-color: ${({theme}) => theme.colors.background};
    padding: 24px;
    justify-content: space-between;
`;

export const InputContainer = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({theme})=> theme.fonts.bold};
    font-size: ${RFValue(32)}px;
    color: ${({theme})=> theme.colors.text};
    margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`

`;
