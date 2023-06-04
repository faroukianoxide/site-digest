/* eslint-disable react/no-children-prop */
import Head from 'next/head'
import { Inter } from 'next/font/google'
import {
  Badge, Box, Button, Card, Center, Flex, Grid, GridItem,
  Heading, HStack, IconButton, Input, Link, SkeletonCircle,
  SkeletonText, Spacer, Spinner, Tag, Text, VStack,
  Icon
} from '@chakra-ui/react'
import axios from 'axios';
import { FormEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdAdd, MdArticle, MdKeyboard, MdPlusOne, MdRemove, MdSave } from 'react-icons/md';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [siteURL, setSiteURL] = useState('');
  const [summary, setSummary] = useState('');
  const [mainContentStatus, setMainContentSatus] = useState('empty');


  const markdown = `[Just a link](https://reactjs.com)`

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    console.log(siteURL);
    setMainContentSatus('loading');
    const result = await axios.get(
      'http://localhost:3000/api/digest?site=' + siteURL
    )
    setSummary(result.data)
    setMainContentSatus('loaded');


  }
  return (
    <>
      <Head>
        <title>Site Digest</title>

        <meta name="description" content="Get instant summary of any web page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logoss.svg" />
      </Head>

      <Flex direction="column"
        h={{ base: '100vh', sm: '100vh', lg: '100vh', md: '100vh', }} alignItems="center"
        w="100%"
        paddingBottom={30}
        paddingTop={{ lg: 10 }}


      >

        <Heading>Site Digest</Heading>
        <Text>Get instant summary of any web page</Text>



        <form onSubmit={(e) => submitForm(e)} >
          <HStack
            width={'100%'}
            marginTop={'50px'}

            justifyContent='center'
            textAlign={'center'}

          >
            <Input
              width={{ base: '30rem' }}
              borderWidth={'1px'}
              borderColor={'black'}
              placeholder="Enter a url"
              onChange={(e) => {
                //console.log('changed')
                setSiteURL(e.target.value);
              }}


            ></Input>
            <Button
              alignSelf={'center'}
              type="submit"

            >Go</Button>
          </HStack>
        </form>
        <MainTextContainer status={mainContentStatus} summary={summary} />


        <Spacer />


        <Text marginTop={100}
        >© Farouk Ibrahim</Text>



      </Flex>
    </>
  )
}


function MainTextContainer(props: { status: string, summary: string }) {
  if (props.status === 'empty') {
    return null;
  }

  if (props.status === 'loading') {
    return <>

      <Flex height={'100%'}
        marginTop={'50px'}
        whiteSpace="pre-line"
        width={'70%'}
        direction={'row'}
        justifyContent='center'

      >




        <Box padding='6' width={'100%'}>
          <Center><Text>Brewing you a fresh summary...</Text></Center>
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />

          <SkeletonText mt='30px' noOfLines={4} spacing='4' skeletonHeight='2' />

          <SkeletonText mt='30px' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>

        <VStack marginLeft={'30px'} padding='6' justifyContent={'center'}>
          <IconButton aria-label='fd' icon={<Icon as={MdAdd} />}></IconButton>
          <IconButton aria-label='fd' icon={<Icon as={MdRemove} />}></IconButton>
          <IconButton aria-label='fd' icon={<Icon as={MdArticle} />}></IconButton>
          <IconButton aria-label='fd' icon={<Icon as={MdSave} />}></IconButton>
        </VStack>



      </Flex>

    </>




  }
  if (props.status === 'loaded') {
    return <Flex height={'100%'}
      marginTop={'50px'}
      whiteSpace="pre-line"
      width={'70%'}
      direction={'row'}
      justifyContent='center'

    >




      <Box padding='6' width={'100%'}>
        <ReactMarkdown children={props.summary} />
      </Box>

      <VStack marginLeft={'30px'} padding='6' justifyContent={'center'}>
        <IconButton aria-label='fd' icon={<Icon as={MdAdd} />}></IconButton>
        <IconButton aria-label='fd' icon={<Icon as={MdRemove} />}></IconButton>
        <IconButton aria-label='fd' icon={<Icon as={MdArticle} />}></IconButton>
        <IconButton aria-label='fd' icon={<Icon as={MdSave} />}></IconButton>
      </VStack>



    </Flex>
  }
  return null;
}
