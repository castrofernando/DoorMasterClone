import React from "react";
import { InputForm } from "../Form/InputForm";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {useAuth} from '../../hooks/AuthContext';
import {Alert, TouchableWithoutFeedback,Keyboard} from 'react-native';

const schema = Yup.object().shape({  
    email: Yup.string().required('E-mail is required'),  
});

import {
    Container,
    InputContainer,
    Title,
    ButtonContainer,
} from './styles';
import { Button } from '../Form/Button';

interface RegisterProps{
    closeRegisterModal: ()=>void;
}

export function ForgotPassword({closeRegisterModal}: RegisterProps){

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({ resolver: yupResolver(schema) });

    interface LoginData{
        email: string;
        password: string;
    }
   
   const auth = useAuth();

   async function handleRecover(form){
       const secret = {
           email: form.email,
           password: form.password
       } as LoginData;
       
       console.log(secret);

        try{
            await auth.forgotPassword(secret);
            Alert.alert('An email was sent with a procedure to change your password');
            closeRegisterModal();
        }catch(error){
            if(error.code==='auth/user-not-found'){
                Alert.alert('User not found');
            }else if(error.code === 'auth/invalid-email'){
                Alert.alert('Enter a valid e-mail');
            }
            console.log(error);
        }

          
   }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                    <InputContainer>
                    <Title>Recover password</Title>
                        <InputForm control={control} name="email" placeholder="E-mail" autoCapitalize="none" error={errors.email && errors.email.message}/>
                    </InputContainer>
                    <ButtonContainer>
                        <Button title="Recover" onPress={handleSubmit(handleRecover)}/>
                        <Button title="Back" onPress={closeRegisterModal}/>
                    </ButtonContainer>
            </Container>
        </TouchableWithoutFeedback>
    );
}