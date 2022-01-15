import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import { motion } from 'framer-motion';
import db from '../../../db.json';
import Widget from '../../components/Widget';
import Background from '../../components/Background';
import GameLogo from '../../components/GameLogo';
import Time from '../../components/Time';
import Alert  from '../../components/Alert';
import BackLinkArrow  from '../../components/BackLinkArrow';
import GameContainer from '../../components/GameContainer';



function ResultWidget({ results }) {
    const router = useRouter();
    const { name } = router.query;
  
  
    return (
      <>
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
          {`PARABÉNS 🏅 ${name}!!`}
        </Widget.Header>
        <Widget.Content>
          <h1>Games</h1>
        </Widget.Content>
        </Widget>
      </>
    );
  }
  
  function LoadingWidget() {
    return (
      <Widget>
        <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
          <Lottie
            width="400px"
            height="400px"
            className="lottie-container basic"
            config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
          />
        </Widget.Content>
      </Widget>
    );
  }
  
  function PlayingWidget({
    playing,
    playingIndex,
    totalPlayings,
    onSubmit,
    addResult,
  }) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isPlayingSubmited, setIsPlayingSubmited] = React.useState(false);
    const playingId = `playing__${playingIndex}`;
    const isCorrect = selectedAlternative === playing.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;
    
    const [timer, setTimer] = React.useState(30);
  
    React.useEffect(() => {
          let alarm = setInterval(handleTimer, 1000);
  
          function handleTimer() {
              setTimer((timer) => timer - 1);
          }
  
          if (timer === 0) {
              console.log(timer);
              clearInterval(alarm);
              setTimer(0);
              setTimeout(() => {() => router.push('/')}, 5 * 1000);
          }
  
          return () => clearInterval(alarm);
    }, [timer]);
    
    return (
      <>
        <Alert status={timer === 0 ? 'show' : ''} />
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
          <BackLinkArrow href="/" />
          <h3>
            {`Pergunta ${playingIndex + 1} de ${totalPlayings}`}
          </h3>
          <Time count={timer} />
        </Widget.Header>
  
        <Widget.Content>
         <h1>Gemae</h1>
        </Widget.Content>
      </Widget> 
      </>
    );
  }
  
  const screenStates = {
    GAME: 'GAME',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };