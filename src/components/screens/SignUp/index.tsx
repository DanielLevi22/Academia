import {VStack, Image, Text, Center, Heading, ScrollView ,useToast} from "native-base";
import background from '@assets/backround.png'
import LogoSvg from '@assets/Logo.svg'
import {Input} from '@components/input'
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const singUpSchema = yup.object({
  name: yup.string().required("informe seu nome."),
  email: yup.string().required("informe seu e-mail.").email('E-mail Invalido.'),
  password: yup.string().required("Informe a senha.").min(6, 'A senha deve ter no minimo 6 digitos.'),
  password_confirm: yup.string().required("Confirme a senha.").oneOf([yup.ref("password"), null], "A senha nao confere.")
})



export function SignUp(){
  const toast = useToast()

  const  { control, handleSubmit , formState:{ errors} } = useForm<FormDataProps>({
    resolver: yupResolver(singUpSchema)
  })


  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSingUp({name, email, password}: FormDataProps)  {
    
    try{
       const response = await api.post('/users', { name, email, password})
        console.log(response.data)
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message: 'Nao foi  possível criar a conta.Tente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  return(


    <ScrollView contentContainerStyle={{flexGrow:1}} showsHorizontalScrollIndicator={false}>

    
         <VStack flex={1} bg="gray.700" px={10} pb={16}>
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
            Crie sua conta
          </Heading>


          <Controller
            control={control} 
            name="name"
            render={({field: { onChange, value }}) =>(
            <Input 
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
              />
          )}
          />

          <Controller
              control={control} 
              name="email"
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
          control={control} 
          name="password"
          render={({field: { onChange, value }}) =>(
        
            <Input 
            placeholder="Senha"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          errorMessage={errors.password?.message}

          />
          )}
          />

         <Controller
          control={control} 
          name="password_confirm"
          render={({field: { onChange, value }}) =>(
          <Input
           placeholder="Confirme a senha"
          secureTextEntry
          onChangeText={onChange}
          value={value}
          errorMessage={errors.password_confirm?.message}

          />
          )}
          />
      
         
          <Button 
          title="Criar e acessar"
          onPress={handleSubmit(handleSingUp)}
          />
      </Center>

    
          <Button
           title="Voltar para o login"
            variant="outline" mt={24}
            onPress={handleGoBack}
            />
      
      
     </VStack>
     </ScrollView>
  )
}