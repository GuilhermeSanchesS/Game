import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../../db.json'
import Widget from '../components/Widget';
import GameLogo from '../components/GameLogo';
import Background from '../components/Background';
import Input from '../components/Input';
import Button from '../components/Button';

export const Container = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
  h1{
    font-weight: bold;
    letter-spacing: 2px;
  }
`;
export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <>
      <Background backgroundImage={db.bg}>
        <Head>
          <title>{db.title}</title>
        </Head>
        <Container>
          <GameLogo/>
        
        <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                router.push(`/game?name=${name}`);
                console.log('Fazendo uma submissão por meio do react');
              }}
              >
                <Input
                  name="nomeDoUsuario"
                  onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                  placeholder="Diz ai seu nome"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>
          </Container>
      </Background>
    </>
  )
}
