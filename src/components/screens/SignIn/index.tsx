import {VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import background from '@assets/backround.png'
import LogoSvg from '@assets/Logo.svg'
import {Input} from '@components/input'
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"


type FormDataPropsSinIn = {
  email: string
  password: string
}
const sigInSchema = yup.object({
  email: yup.string().email('Formato de E-mail invalido').required('Informe o email'),
  password: yup.string().required('Informe a senha').min(6, 'A senha precisa ter pelo menos 6 digitos'),
})


export function SignIn(){

  const {control, handleSubmit ,formState:{ errors }} = useForm<FormDataPropsSinIn>({
    resolver: yupResolver(sigInSchema)
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount(){
    navigation.navigate('signUp')
  }

  function handleSignIn(data:any){
    console.log(data)
  }

  return(
    <ScrollView contentContainerStyle={{flexGrow:1}} showsHorizontalScrollIndicator={false}>

    
         <VStack flex={1} px={10} pb={16}>
        <Image 
          source={background}
          defaultSource={background}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center >
        
           <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
            Acesse a sua conta   
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({field: { onChange, value }}) =>(
              <Input 
                 placeholder="E-mail" 
                 keyboardType="email-address" 
                 autoCapitalize="none"
                 onChangeText={onChange}
                 value={value}
                 errorMessage={errors.email?.message}   
              />
           )}
       />

       <Controller
            name="password"
            control={control}
            render={({field: { onChange, value }}) =>(
              <Input 
                 placeholder="Senha" 
                 secureTextEntry={true} 
                 autoCapitalize="none"
                 onChangeText={onChange}
                 value={value}
                 errorMessage={errors.password?.message}   
              />
           )}
       />      
          <Button 
          title="Acessar"
          onPress={handleSubmit(handleSignIn)}
          />
      </Center>

      <Center mt={24}>
            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda nao tem acesso?
          </Text>
          <Button 
          title="Criar conta"
           variant="outline"
           onPress={handleNewAccount}
           />
      </Center>
      
     </VStack>
     </ScrollView>
  )
}