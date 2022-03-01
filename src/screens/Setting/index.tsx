import React, { useState } from "react";
import { Feather } from '@expo/vector-icons';
import { RowButton } from "../../components/Form/RowButton";
import { SwipeButton } from "../../components/Form/SwipeButton";
import {
    Container,
    AcoountWrapper,
    AccountIcon,
    ButtonWrapper,
    Title,
    Icon,
    ExitButton,
    ExitLabel,
} from './styles';
import { Text } from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import theme from "../../global/styles/theme";


export function Setting(){
    const[vibrationOpen,setVibrationOpen] = useState(false);
    const[startOpen,setStartOpen] = useState(false);

    const auth = useAuth();
    const navigation = useNavigation();

    function handleVibrationOpen(){
        setVibrationOpen(previousState => !previousState);
    }

    function handleStartOpen(){
        setStartOpen(previousState => !previousState);
    }

    async function handleLogout(){
        await auth.signOut();
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, backgroundColor: theme.colors.background}}>
        <Container>
            <AcoountWrapper>
                <AccountIcon name="user"/>
                <ButtonWrapper>
                    <Title>Conta</Title>
                    <Icon name="chevron-right"/>
                </ButtonWrapper>
            </AcoountWrapper>
            <SwipeButton title="Abertura por vibração" onValueChange={handleVibrationOpen} value={vibrationOpen}/>
            <SwipeButton title="Início de abertura" onValueChange={handleStartOpen} value={startOpen}/>
            <RowButton title="Distância de detecção da porta" onPress={()=>{}}/>
            <RowButton title="Abrir registro" onPress={()=>{}}/>
            <RowButton title="Mensagem" onPress={()=>{}}/>
            <RowButton title="Sobre" onPress={()=>navigation.navigate('BLE')}/>
            <ExitButton onPress={handleLogout}>
                <ExitLabel>Sair</ExitLabel>
            </ExitButton>
        </Container>
        </ScrollView>
    );
}