import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Feather} from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
    background-color: ${({theme})=>theme.colors.primary};
    width: ${RFPercentage(10)}px;
    height: ${RFPercentage(10)}px;
    border-radius: ${RFValue(100)}px;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(42)}px;
    color: ${({theme})=> theme.colors.secundary};
`;