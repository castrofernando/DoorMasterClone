import React from "react";
import { TouchableOpacityProps } from "react-native";

import {
    Container,
    Icon,
} from './styles';

interface Props extends TouchableOpacityProps{
    name: string,
    onPress: () => void;
}

export function RoundedButton(
    {
        name,
        onPress,
        ...rest
    }: Props
){
    return (
        <Container {...rest} onPress={onPress}>
            <Icon name={name}/>
        </Container>
    )
}