import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import {SimpleLineIcons, FontAwesome} from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({theme})=> theme.colors.secundary};
    border-radius: 10px;
    padding: 18px 12px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

export const DeviceInfo = styled.View`
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    padding-left: 20px;
`;

export const Name = styled.Text`
    font-family: ${({theme})=> theme.fonts.medium};
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const Link = styled.View`
  flex-direction: row;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  
`;

export const Status = styled.Text`
    font-family: ${({theme})=> theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const IconStatus = styled(SimpleLineIcons)`
    font-size: ${RFValue(16)}px;
    margin-left: 10px;
`;

export const Actions = styled.View`
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

export const Edit = styled(FontAwesome)`
    color: black;
    font-size: ${RFValue(24)}px;
    margin-bottom: 15px;
    margin-top: 10px;
`;

export const Remove = styled(SimpleLineIcons)`
    color: red;
    font-size: ${RFValue(24)}px;
`;
