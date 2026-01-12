import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RoundSelection.css';

const RoundSelection = ({ gameState, updateGameState }) => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  
  const team = gameState.teams.find(t => t.id === parseInt(teamId));
  const [localBaseScores, setLocalBaseScores] = useState(team ? team.baseScores : [0, 0, 0, 0, 0]);

  if (!team) {
    navigate('/');
    return null;
  }

  const handleBaseScoreChange = (roundIndex, value) => {
    const newBaseScores = [...localBaseScores];
    newBaseScores[roundIndex] = parseFloat(value) || 0;
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

    if (baseScore <= 0) {
      alert('Please enter a valid base score greater than 0');
      return;
    }

    updateGameState({
      currentTeam: team.id,
      currentRound: roundIndex,
      currentBaseScore: baseScore
    });

    navigate('/options');
  };

  const isRoundDisabled = (roundIndex) => {
    if (roundIndex === 0) {
      return team.finalScores[0] !== null;
    }
    return team.finalScores[roundIndex - 1] === null || team.finalScores[roundIndex] !== null;
  };

  const getRoundStatus = (roundIndex) => {
    if (team.finalScores[roundIndex] !== null) {
      return 'completed';
    }
    if (roundIndex === 0) {
      return 'active';
    }
    if (team.finalScores[roundIndex - 1] !== null) {
      return 'active';
    }
    return 'locked';
  };

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
          <p className="section-subtitle">Complete all 5 rounds sequentially</p>
          <button className="btn btn-secondary btn-back" onClick={() => navigate('/')}>
            ← Back to Teams
          </button>
        </div>

        <div className="rounds-grid">
          {[0, 1, 2, 3, 4].map((roundIndex) => {
            const status = getRoundStatus(roundIndex);
            const isDisabled = isRoundDisabled(roundIndex);

            return (
              <div 
                key={roundIndex} 
                className={`round-card ${status}`}
              >
                <div className="round-header">
                  <div className="round-number-large">
                    Round {roundIndex + 1}
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
                      value={localBaseScores[roundIndex] || ''}
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
                      value={team.finalScores[roundIndex] !== null ? team.finalScores[roundIndex].toFixed(2) : ''}
                      disabled
                      readOnly
                    />
                  </div>

                  <button
                    className={`btn btn-primary btn-play ${isDisabled ? 'disabled' : ''}`}
                    onClick={() => handleGoClick(roundIndex)}
                    disabled={isDisabled}
                  >
                    Play Round
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="team-summary">
          <div className="summary-item">
            <span className="summary-label">Rounds Completed</span>
            <span className="summary-value">{team.finalScores.filter(s => s !== null).length}/5</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-label">Grand Total</span>
            <span className="summary-value grand-total">
              {team.finalScores.filter(s => s !== null).reduce((sum, score) => sum + score, 0).toFixed(2)}
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
