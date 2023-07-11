import { Heading, VStack,Input, Text, useToast } from "native-base";
import {Header} from '../components/Header';
import Logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { api } from "../services/api";
import { useState } from "react";


export function Find() {
    const [isLoading,setIsLoading] = useState(false);
    const toast = useToast();   


    async function handlePoolJoin() {
        try {
            setIsLoading(true)
            const response = await api.get(`/pool/${isPool}`)
        } catch (error) {
            console.log(error)

            if(error.response?.data?.message === 'Pool not found') { {
                toast.show({
                    title: 'Não foi possível encontrar o bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            }
       
        } finally {
            setIsLoading(false)
        }
    }
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header 
            title="Buscar por código"
            showBackButton
            />
            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center"> 
                   Encontre um bolão através de {'\n'}
                   seu código único
                </Heading>

                <Input 
                mb={2}
                placeholder="Qual o código do bolão"
                color="white"
                />

                <Button 
                title="BUSCAR POR BOLÃO"
                isLoading={isLoading}
                onPress={handlePoolJoin}
                />
            </VStack>

        </VStack>
    )
}