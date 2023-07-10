import { useState } from "react";

import { Heading, VStack, Input, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "Informe um nome para o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setLoading(true);
    } catch (error) {
      toast.show({
        title: "Informe um nome para o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu prórpio bolão da copa e {"\n"} compatilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão"
          onChangeText={setTitle}
          value={title}
        />

        <Button title="CRIAR MEU BOLÃO" isLoading={isLoading} />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </Text>
      </VStack>
    </VStack>
  );
}
