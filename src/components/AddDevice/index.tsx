import React, { useEffect, useState } from "react";
import { InputForm } from "../Form/InputForm";
import { Button } from "../Form/Button";
import { ViewProps } from "react-native";

import { FieldValue, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Keyboard, TouchableWithoutFeedback,Modal, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../hooks/AuthContext';

import {
    Container
} from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required('Device name is required'),
    macAddress: Yup.string().required('Mac Address is required')
});


interface Props{
    device: DeviceProps;
    close: ()=> void;
    isEditing: boolean;
}

interface User{
    id: string;
    name: string;
    email: string;
}

interface DeviceProps{
    id?: string;
    name: string;
    macAddress: string;
    user: User
    createdAt: FieldValue;
    updatedAt: FieldValue;
}

export function AddDevice({close, device,isEditing}:Props){

    const [isLoading,setIsLoading] = useState(false);
    const {user} = useAuth();

    useEffect(()=>{
        if(device){
            setValue('name',device.name);
            setValue('macAddress',device.macAddress);
        }
    },[]);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: {errors}
    } = useForm({ resolver: yupResolver(schema) });

    async function handleAddDevice(form){
        setIsLoading(true);
        const data: DeviceProps = {
            name: form.name,
            macAddress: form.macAddress.toUpperCase(),
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: null,
            user: {
                email: user.email,
                name: user.name,
                id: user.id,
            }
        }

        firestore()
        .collection('Device')
        .add(data)
        .then(() => {
          console.log('Device was added!');
        });
          
        setIsLoading(false);
        reset();
        close();
    }

    async function handleEditDevice(form){
        setIsLoading(true);
        
        firestore()
        .collection('Device')
        .doc(device.id)
        .update({
            'name': form.name,
            'macAddress': form.macAddress.toUpperCase(),
            'updatedAt':  firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log('Device was updated!');
        });
          
        setIsLoading(false);
        reset();
        close();
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <InputForm  name="name" placeholder="Device name" control={control} autoCapitalize="sentences" error={errors.name && errors.name.message}/>
                <InputForm  name="macAddress" placeholder="Mac Address" control={control} autoCapitalize="none" error={errors.name && errors.macAddress.message}/>
                <Button title="Registrar" onPress={handleSubmit(isEditing?handleEditDevice: handleAddDevice)} isLoading={isLoading}/>
                <Button title="Cancelar" onPress={close} isLoading={false}/>
            </Container>
        </TouchableWithoutFeedback>
    )
}