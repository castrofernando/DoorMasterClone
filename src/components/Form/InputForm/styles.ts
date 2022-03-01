import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    width: 100%;
`;

export const Error = styled.TextInput`
    color: ${({theme})=>theme.colors.errors};
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(12)}px;
`;