import React from "react";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import theme from "../../../global/styles/theme";

import {
    Container,
    Title,
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string,
    isLoading: boolean
    onPress: () => void;
}

export function Button(
    {
        title,
        onPress,
        isLoading,
        ...rest
    }: Props
){
    return (
        <Container {...rest} onPress={onPress} >
            <Title>{title}</Title> 
            {
                isLoading && <ActivityIndicator animating={true} color={theme.colors.secundary}/>
            }
        </Container>
    )
}