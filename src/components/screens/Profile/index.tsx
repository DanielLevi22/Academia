import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import {Center, ScrollView, VStack , Skeleton, Text, Heading, useToast} from 'native-base'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input } from '@components/input';
import { Button } from '@components/Button';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
const PHOTO_SIZE = 33;



export function Profile() {
  const [photoLoading, setPhotoLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/daniellevi22.png')
  const toast = useToast()
  async	function handleUserPhotoSelect() {
    setPhotoLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
      if(photoSelected.cancelled) {
        return;
      }
      if(photoSelected.uri){
        const photoInfo =  await FileSystem.getInfoAsync(photoSelected.uri)

        if(photoInfo.size && (photoInfo.size /1024 /1024) > 5) {
          return  toast.show({
            title:'Essa imagem é mt grande. Escolha uma ate 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
        }
      setUserPhoto(photoSelected.uri)
      }
      
    } 
    catch (error) {
      
    }finally{
      setPhotoLoading(false)
    }
  }


  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil'/>
      <ScrollView contentContainerStyle={{paddingBottom: 36}}>
      <Center mt={6} px={10}>
      {

      photoLoading?
        <Skeleton 
          w={PHOTO_SIZE}
          h={PHOTO_SIZE}
          rounded="full"
          startColor="gray.500"
          endColor="gray.400"
        />
        :
        <UserPhoto 
       source={{uri: userPhoto}}
        alt='Foto do usuario'
        size={PHOTO_SIZE}
      />
    }
        <TouchableOpacity onPress={handleUserPhotoSelect}>
          <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
            Alterar foto
            </Text>
        </TouchableOpacity>

        <Input 
         placeholder='Nome'
         bg="gray.600"
        />
        <Input 
         bg="gray.600"
         placeholder="E-mail"
         isDisabled
        />
      </Center>
      <Center px={10} mt={12} mb={9}>
      <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" fontFamily="heading">
        Alterar senha
      </Heading>
      <Input 
         bg="gray.600"
         placeholder="Senha antiga"
         secureTextEntry
        />
         <Input 
         bg="gray.600"
         placeholder="Nova senha"
         secureTextEntry
        />     
        <Input 
        bg="gray.600"
        placeholder="Confirme nova "
        secureTextEntry
       /> 

      <Button 
      mt={4}
      title='Atualizar'
      />
      </Center>

      </ScrollView>
      
    </VStack>   
  )
}