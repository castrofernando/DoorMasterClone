import React, { useEffect, useState } from "react";

import {
    Container,
    Title,
    FormFields,
    WrapperAccount, 
} from './styles';


import {InputForm} from '../../components/Form/InputForm';
import { Button } from "../../components/Form/Button";
import { TextButton } from "../../components/Form/TextButton";
import { Register } from '../../components/Register';

import { Keyboard, TouchableWithoutFeedback,Modal, Alert, ActivityIndicator } from "react-native";

import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const schema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password is required')
});

import {AuthProvider, useAuth} from '../../hooks/AuthContext';
import { ForgotPassword } from "../../components/ForgotPassword";

export function Login({ navigation }){

    const [isLoading,setIsLoading] = useState(false);
    const [registerModal,setRegisterModal] = useState(false);
    const [forgotModal,setForgotModal] = useState(false);
    const auth = useAuth();

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({ resolver: yupResolver(schema) });

    async function handleUserLogin(form){
        setIsLoading(true);
        const secret = {
            email: form.username,
            password: form.password
        }
        try{
            await auth.signIn(secret);
            if(auth.user.isVerified===false){
                Alert.alert('Please, verify your e-mail before proceed');
            }
        }catch(error){
            if(error.code === 'auth/user-not-found' || error.code==='auth/wrong-password'){
                Alert.alert('Wrong username or password');
            }
            console.log(error);
        }
        setIsLoading(false);
    }

    /*
    useEffect(()=>{
        firestore()
        .collection('Users')
        .add({
            name: 'Vanessa',
            email: 'vanessafruiz@hotmail.com'
        }).then(()=>{
            console.log("Adicionado!");
        });

    },[]);

    */

    function handleOpenRegisterModal(){
        setRegisterModal(true);
    }

    function handleCloseRegisterModal(){
        setRegisterModal(false);
    }

    function handleOpenForgotModal(){
        setForgotModal(true);
    }

    function handleCloseForgotModal(){
        setForgotModal(false);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>    
            <Container>
                <Title>DoorMaster</Title>
                <FormFields>
                    <InputForm name="username" control={control} placeholder="Username" autoCapitalize="none" error={errors.username && errors.username.message}/>
                    <InputForm name="password" control={control} placeholder="Password" autoCapitalize="none" error={errors.password && errors.password.message}/>
                    <Button title="Login" onPress={handleSubmit(handleUserLogin)} isLoading={isLoading}/>
                    <WrapperAccount>
                        <TextButton title="Register" onPress={handleOpenRegisterModal} />
                        <TextButton title="Forgot?" onPress={handleOpenForgotModal}/>
                    </WrapperAccount>
                </FormFields>
                <Modal visible={registerModal} onRequestClose={handleCloseRegisterModal}>
                    <Register closeRegisterModal={handleCloseRegisterModal}/>
                </Modal>
                <Modal visible={forgotModal} onRequestClose={handleCloseForgotModal}>
                    <ForgotPassword closeRegisterModal={handleCloseForgotModal}/>
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
        )
}