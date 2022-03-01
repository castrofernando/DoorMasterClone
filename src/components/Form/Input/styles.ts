import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TextInput`
    background-color: ${({theme})=>theme.colors.inputBackground};
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    margin: 5px 0px;
    width: 100%;
    height: 38px;
    border-radius: 5px;
    padding-left: 10px;
`;

