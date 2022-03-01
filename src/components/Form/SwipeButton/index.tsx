import React from "react";
import { Switch, SwitchProps } from "react-native";
import {
    Container,
    Title,
    Icon,
} from './styles';

interface Props extends SwitchProps{
    title: string,
    onValueChange: () => void,
    value: boolean
}

export function SwipeButton({ title, onValueChange,value, ...rest}: Props){
    return (
        <Container >
            <Title>{title}</Title>
            <Switch onValueChange={onValueChange} value={value} {...rest}/>
        </Container>
    );
}