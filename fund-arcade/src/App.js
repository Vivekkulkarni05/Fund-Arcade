import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import TeamList from './components/TeamList';
import RoundSelection from './components/RoundSelection';
import OptionSelection from './components/OptionSelection';
import ResultPage from './components/ResultPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [gameState, setGameState] = useState(() => {
    const savedState = localStorage.getItem('fundArcadeGameState');
    if (savedState) return JSON.parse(savedState);

    return {
      teams: [
        { id: 1, name: 'TechVentures Inc.', baseScores: [0,0,0,0,0], finalScores: [null,null,null,null,null] },
        { id: 2, name: 'InnovateLabs', baseScores: [0,0,0,0,0], finalScores: [null,null,null,null,null] },
        { id: 3, name: 'StartupHub Pro', baseScores: [0,0,0,0,0], finalScores: [null,null,null,null,null] },
        { id: 4, name: 'FutureStack', baseScores: [0,0,0,0,0], finalScores: [null,null,null,null,null] },
        { id: 5, name: 'QuantumLeap', baseScores: [0,0,0,0,0], finalScores: [null,null,null,null,null] }
      ],
      currentTeam: null,
      currentRound: null,
      currentBaseScore: 0,
      selectedOption: null,
      calculatedScore: null
    };
  });

  useEffect(() => {
    localStorage.setItem('fundArcadeGameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TeamList gameState={gameState} updateGameState={updateGameState} />} />
        <Route path="/rounds/:teamId" element={<RoundSelection gameState={gameState} updateGameState={updateGameState} />} />
        <Route path="/options" element={<OptionSelection gameState={gameState} updateGameState={updateGameState} />} />
        <Route path="/result" element={<ResultPage gameState={gameState} updateGameState={updateGameState} />} />
      </Routes>
    </Router>
  );
}

export default App;
