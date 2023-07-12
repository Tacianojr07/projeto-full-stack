import { useState } from 'react';

import { VStack, useToast } from  'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';


interface RouteParams {
    id: string;
}

export function Details() {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const route = useRoute();
    const {id} = route.params as RouteParams;

    async function fetchPoolDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);
            console.log(response.data);


        } catch (error) {
            console.log(error);
            toast.show({
                title: 'Não foi possível carregar os detalhes do bolão',
                placement: 'top',
                bgColor: 'red.500'
            });



            throw error
        } finally {
            setIsLoading(false);
        }
    }

    if(isLoading) {
        return <Loading />
    }
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title={  id } showBackButton showShareButton/>
        </VStack>
    );
}