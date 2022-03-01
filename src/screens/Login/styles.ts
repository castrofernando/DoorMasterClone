import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex:1;
    width: 100%;
    background-color: ${({theme})=>theme.colors.background};
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.bold};
    font-size: ${RFValue(48)}px;
    margin-top: ${getStatusBarHeight() + RFValue(60)}px;
`;
export const FormFields = styled.View`
    margin-top: ${RFValue(60)}px;
    width: 100%;
    padding: 30px;
`;
export const WrapperAccount = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 18px;
`;