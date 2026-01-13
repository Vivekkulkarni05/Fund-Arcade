import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RoundSelection.css';

const RoundSelection = ({ gameState, updateGameState }) => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  
  const team = gameState.teams.find(t => t.id === parseInt(teamId));

  // --- CONFIGURATION: EDIT YOUR ROUND NAMES HERE ---
  const roundNames = [
    "LearnUp",           // Round 1 Name
    "RentFurn",         // Round 2 Name
    "QuickFetch",        // Round 3 Name
    "HomeQuest",         // Round 4 Name
    "FinWave",         // Round 5 Name
    "ShopLink",        // Round 6 Name
    "MealGenie",       // Round 7 Name
    "TravelGo"          // Round 8 Name
  ];
  // -------------------------------------------------
  
  // CHANGED: Initialize state using a function to clean up '0's
  const [localBaseScores, setLocalBaseScores] = useState(() => {
    // Safety check
    if (!team || !team.baseScores) {
        return Array(8).fill('');
    }

    // Create a copy of the existing scores
    const scores = [...team.baseScores];

    // Ensure array is exactly 8 items long
    while (scores.length < 8) scores.push('');

    // CRITICAL FIX: Convert any 0 values to '' (empty string)
    // This forces the "Enter score" placeholder to appear instead of 0.
    return scores.map(s => (s === 0 ? '' : s));
  });

  if (!team) {
    navigate('/');
    return null;
  }

  const handleBaseScoreChange = (roundIndex, value) => {
    const newBaseScores = [...localBaseScores];
    // Ensure array is long enough
    while (newBaseScores.length < 8) newBaseScores.push('');
    
    // If value is empty string, keep it empty.
    if (value === '') {
        newBaseScores[roundIndex] = '';
    } else {
        newBaseScores[roundIndex] = parseFloat(value);
    }
    
    setLocalBaseScores(newBaseScores);
    
    // Update in gameState
    const updatedTeams = gameState.teams.map(t => {
      if (t.id === team.id) {
        return { ...t, baseScores: newBaseScores };
      }
      return t;
    });
    updateGameState({ teams: updatedTeams });
  };

  const handleGoClick = (roundIndex) => {
    const baseScore = localBaseScores[roundIndex];

    // Validation to check for empty string
    if (baseScore === '' || baseScore === null || baseScore === undefined) {
        alert('Please enter a score');
        return;
    }

    if (baseScore < 0) {
      alert('Please enter a valid base score (0 or greater)');
      return;
    }

    // Logic for 0 input: Skip options, mark as completed with 0
    if (baseScore === 0) {
        const updatedTeams = gameState.teams.map(t => {
            if (t.id === team.id) {
                const newFinalScores = [...(t.finalScores || [])]; 
                while(newFinalScores.length < 8) newFinalScores.push(null);
                
                newFinalScores[roundIndex] = 0; // Set Result to 0
                
                return { ...t, finalScores: newFinalScores };
            }
            return t;
        });

        updateGameState({ teams: updatedTeams });
        return; // Return immediately (Do NOT navigate)
    }

    // Normal logic for scores > 0
    updateGameState({
      currentTeam: team.id,
      currentRound: roundIndex,
      currentBaseScore: baseScore
    });

    navigate('/options');
  };

  const isRoundDisabled = (roundIndex) => {
    if (!team.finalScores) return true;
    if (roundIndex === 0) {
      return team.finalScores[0] !== null;
    }
    return (team.finalScores[roundIndex - 1] === null || team.finalScores[roundIndex - 1] === undefined) || team.finalScores[roundIndex] !== null;
  };

  const getRoundStatus = (roundIndex) => {
    if (team.finalScores && team.finalScores[roundIndex] !== null && team.finalScores[roundIndex] !== undefined) {
      return 'completed';
    }
    if (roundIndex === 0) {
      return 'active';
    }
    if (team.finalScores && team.finalScores[roundIndex - 1] !== null && team.finalScores[roundIndex - 1] !== undefined) {
      return 'active';
    }
    return 'locked';
  };

  const roundsArray = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <img src="/psf_logo.jpeg" alt="PSF Logo" className="header-logo left" />
          <div className="header-text">
            <h1 className="game-title">FUND ARCADE</h1>
            <p className="event-name">Pune Startup Fest '26</p>
          </div>
          <img src="/coep_logo.png" alt="COEP Logo" className="header-logo right" />
        </div>
      </header>

      <main className="main-content">
        <div className="intro-section">
          <h2 className="section-title">{team.name}</h2>
          <p className="section-subtitle">Complete all 8 rounds sequentially</p>
          <button className="btn btn-secondary btn-back" onClick={() => navigate('/')}>
            ← Back to Teams
          </button>
        </div>

        <div className="rounds-grid">
          {roundsArray.map((roundIndex) => {
            const status = getRoundStatus(roundIndex);
            const isDisabled = isRoundDisabled(roundIndex);

            return (
              <div 
                key={roundIndex} 
                className={`round-card ${status}`}
              >
                <div className="round-header">
                  <div className="round-number-large">
                    {roundNames[roundIndex]}
                  </div>

                  {status === 'locked' && <span className="status-badge locked">🔒 Locked</span>}
                  {status === 'completed' && <span className="status-badge completed">✓ Completed</span>}
                  {status === 'active' && <span className="status-badge active">● Active</span>}
                </div>

                <div className="round-content">
                  <div className="input-group-round">
                    <label>Base Score</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Enter score"
                      value={localBaseScores[roundIndex]}
                      onChange={(e) => handleBaseScoreChange(roundIndex, e.target.value)}
                      disabled={isDisabled}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="input-group-round">
                    <label>Final Score</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="--"
                      value={
                        (team.finalScores && team.finalScores[roundIndex] !== null && team.finalScores[roundIndex] !== undefined)
                          ? team.finalScores[roundIndex].toFixed(2) 
                          : ''
                      }
                      disabled
                      readOnly
                    />
                  </div>

                  <button
                    className={`btn btn-primary btn-play ${isDisabled ? 'disabled' : ''}`}
                    onClick={() => handleGoClick(roundIndex)}
                    disabled={isDisabled}
                  >
                    {localBaseScores[roundIndex] === 0 ? 'Submit Zero' : 'Play Round'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="team-summary">
          <div className="summary-item">
            <span className="summary-label">Rounds Completed</span>
            <span className="summary-value">
                {team.finalScores ? team.finalScores.filter(s => s !== null && s !== undefined).length : 0}/8
            </span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-label">Grand Total</span>
            <span className="summary-value grand-total">
              {team.finalScores
                ? team.finalScores
                    .filter(s => s !== null && s !== undefined)
                    .reduce((sum, score) => sum + score, 0)
                    .toFixed(2)
                : "0.00"}
            </span>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Pune Startup Fest. All rights reserved.</p>
        <p className="footer-credit">Made by Web & Tech Team</p>
      </footer>
    </div>
  );
};

export default RoundSelection;