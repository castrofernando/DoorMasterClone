import React from "react";
import { TouchableOpacityProps } from "react-native";

import {
    Container,
    Title,
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string,
    onPress: () => void;
}

export function TextButton(
    {
        title,
        onPress,
        ...rest
    }: Props
){
    return (
        <Container {...rest} onPress={onPress}>
            <Title>{title}</Title>
        </Container>
    )
}