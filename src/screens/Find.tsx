import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, VStack,Input, Text, useToast } from "native-base";

import { api } from "../services/api";

import {Header} from '../components/Header';
import { Button } from "../components/Button";





export function Find() {
    const [isLoading,setIsLoading] = useState(false);
    const [code, setCode] = useState('');   

    const toast = useToast(); 
    const {navigate} = useNavigation();  


    async function handlePoolJoin() {
        try {


            setIsLoading(true)
            
            if (!code.trim()) {
                return toast.show({
                    title: 'Informe o código do bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post('/pools/join' , {code: code})
            

            toast.show({
                title: "Você se juntou ao bolão",
                placement: "top",
                bgColor: "green.500",
              });

              navigate('pools')

        } catch (error) {
            console.log(error)

            setIsLoading(false)
            if(error.response?.data?.message === 'Pool not found') { {
               return toast.show({
                    title: 'Não foi possível encontrar o bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            }
            if(error.response?.data?.message === 'You alrealdy joined this pool') { {
               return toast.show({
                    title: 'Você já está no bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            }
       
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
                autoCapitalize="characters"
                onChangeText={setCode}
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