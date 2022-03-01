import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
`;

export const Title = styled.Text`
    color: ${({theme})=>theme.colors.textButton};
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;