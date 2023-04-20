import { Center, Heading, Text } from "native-base";


type Props = {
  title:string
};



export function ScreenHeader({title}:Props) {
  return(
    <Center  bg="gray.600" pb={6} pt={16} fontSize="xl">
      <Heading color='white' fontFamily="heading">
          { title}
      </Heading>
    </Center>
  )
}