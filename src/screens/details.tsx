import { useEffect, useState } from 'react';

import { HStack, VStack, useToast } from  'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';


interface RouteParams {
    id: string;
}

export function Details() {
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'Ranking'>('guesses');
    const [isLoading, setIsLoading] = useState(true);
    const [poolDetails,setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)

    const toast = useToast();

    const route = useRoute();
    const {id} = route.params as RouteParams;

    async function fetchPoolDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);
            console.log(response.data.pool.participants);


        } catch (error) {
            console.log(error);
            toast.show({
                title: 'Não foi possível carregar os detalhes do bolão',
                placement: 'top',
                bgColor: 'red.500'
            });

        } finally {
            setIsLoading(false);
        }
    }

    useEffect( () => {
        fetchPoolDetails()
    }, [id])

    if(isLoading) {
        return (
            <Loading />
        )
    }
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title={  id } showBackButton showShareButton/>
            

            {
                poolDetails._count?.participants >= 0 ? 
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option
                         title='Seus Palpites' 
                          isSelected={false}/>
                          onPress={()=> setOptionSelected('Ranking')}
                        <Option 
                        title=' Ranking do grupo' 
                         isSelected={false}/>
                         onPress{() => setOptionSelected('guesses')}
                    </HStack>
                </VStack>
                
                

                : <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>
    );
}