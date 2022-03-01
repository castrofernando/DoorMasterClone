import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import {Feather} from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme})=> theme.colors.rowButton};
    padding: 12px 20px;
    margin-bottom: 8px;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-color: ${({theme}) => theme.colors.background};
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