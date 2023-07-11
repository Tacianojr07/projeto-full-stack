import { VStack, Icon, useToast, FlatList } from "native-base";
import {Octicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import { useEffect, useState } from "react";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import {Loading} from '../components/Loading'



export function Pools() {
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolCardProps[]>([]);

  const toast = useToast();
  const {navigate} = useNavigation();

  async function fetchPools() {
    try {
      setIsLoading(true)
      const response = await api.get('/pools')
      console.log(response.data)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'não foi posível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'

      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPools()
  },[] )
  return (
    <VStack flex={1} bgColor="gray.900">
        <Header title="Meus bolões" />


      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
        <Button title="BUSCAR POR CÓDIGO DO BOLÃO" 
        leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
        onPress={() => navigate('find')}
        />
      </VStack>

      <FlatList 
      data={pools}
      keyExtractor={item => item.id}
      renderItem={ ( { item } ) => <PoolCard data={item}/>}
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{pb: 10}}
      />
    </VStack>
  );
}
