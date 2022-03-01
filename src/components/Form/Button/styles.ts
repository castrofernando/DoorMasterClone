import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
    background-color: ${({theme})=>theme.colors.primary};
    margin: 5px 0px;
    width: 100%;
    height: 42px;
    border-radius: 5px;
    padding-left: 10px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    color: ${({theme})=> theme.colors.secundary};
    margin-right: 10px;
`;