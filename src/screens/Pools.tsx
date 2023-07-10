import { VStack, Icon } from "native-base";
import {Octicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import { useEffect } from "react";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard } from "../components/PoolCard";
import {Loading} from '../components/Loading'



export function Pools() {
  const {navigate} = useNavigation();

  async function fetchPools() {
    try {
      const response = await api.get('/pools')
      console.log(response.data)
    } catch (error) {
      
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
    </VStack>
  );
}
