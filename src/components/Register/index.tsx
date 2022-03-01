import React from "react";
import { InputForm } from "../Form/InputForm";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {useAuth} from '../../hooks/AuthContext';
import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('E-mail is required'),
    password: Yup.string().required('Password is required'),
    confirmPass: Yup.string().required('Confirmation password is required')
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

export function Register({closeRegisterModal}: RegisterProps){

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

   function handleRegister(form){
       if(form.password != form.confirmPass){
           Alert.alert('Password confirmation mismatch');
           return;
       }
       if(form.password.length < 6){
           Alert.alert('the password must have at least 6 characters');
           return;
       }
       const secret = {
           email: form.email,
           password: form.password
       } as LoginData;
 
        auth.createUserWithEmailAndPassword(secret).then((result) => {
            console.log('User account created & signed in!');
            console.log(result.user);
            result.user.sendEmailVerification();
            result.user.updateProfile({
                displayName: form.name,
            }).then(()=>{
                console.log('profile updated!');
                console.log(result.user);
                Alert.alert("User created successfully. Please verify your e-mail before login");
                closeRegisterModal();
            })
            console.log(auth.user);
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
              Alert.alert("That email address is already in use!");
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
              Alert.alert("That email address is invalid!");
            }   
            console.error(error);
          });
   }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <InputContainer>
                <Title>Registration Form</Title>
                    <InputForm control={control} name="name" placeholder="Full Name" autoCapitalize="sentences" error={errors.name && errors.name.message}/>
                    <InputForm control={control} name="email" placeholder="E-mail" autoCapitalize="none" error={errors.email && errors.email.message}/>
                    <InputForm control={control} name="password" placeholder="Password" autoCapitalize="none" error={errors.password && errors.password.message}/>
                    <InputForm control={control} name="confirmPass" placeholder="Confirm Password" autoCapitalize="none" error={errors.confirmPass && errors.confirmPass.message}/>
                </InputContainer>
                <ButtonContainer>
                    <Button title="Register" onPress={handleSubmit(handleRegister)}/>
                    <Button title="Back" onPress={closeRegisterModal}/>
                </ButtonContainer>
            </Container>
        </TouchableWithoutFeedback>
    );
}