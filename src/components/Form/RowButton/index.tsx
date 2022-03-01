import React from "react";
import { TouchableOpacityProps } from "react-native";
import {
    Container,
    Title,
    Icon,
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string,
    onPress: () => void
}

export function RowButton({ title, onPress, ...rest}: Props){
    return (
        <Container {...rest} onPress={onPress}>
            <Title>{title}</Title>
            <Icon name="chevron-right"/>
        </Container>
    );
}