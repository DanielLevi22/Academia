import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import {  VStack , Heading, SectionList, Text } from 'native-base'
import { useState } from 'react'

export function History() {
  const [exercises, setExercises] = useState([ {
    title:'26.01.21',
    data: ['Puxada Frontal', 'Remada unilateal']
    },
    {
      title:'26.01.21',
      data: ['Puxada Frontal']
      },
    ])


  return (
    <VStack flex={1} >
     <ScreenHeader title="Historico de Exercicios"/>


      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <HistoryCard />
        )}
        renderSectionHeader={({section}) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}
        ListEmptyComponent={()=> (
          <Text color="gray.100" textAlign='center'>
            Nao ha exercicios registrados ainda. {'\n'}
            Vamos Treinar hoje ?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />

     
     

    </VStack>
  )
}