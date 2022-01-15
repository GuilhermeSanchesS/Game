
import React from 'react';
import { ThemeProvider } from 'styled-components';
import db from '../../../db.json';
import GameScreen from '../../levels/Game'
export default function GameDaGaleraPage() {
  return (
    <ThemeProvider theme={db.theme}>
       <GameScreen
        externalQuestions={db.questions}
        externalBg={db.bg}
      />
    </ThemeProvider>
  );
}