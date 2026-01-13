import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamList.css';

const TeamList = ({ gameState, updateGameState }) => {
  const navigate = useNavigate();

  const handleTeamClick = (teamId) => {
    navigate(`/rounds/${teamId}`);
  };

  const getGrandTotal = (team) => {
    return team.finalScores
      .filter(score => score !== null)
      .reduce((sum, score) => sum + score, 0);
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
          <h2 className="section-title">TEAM SELECTION</h2>
          <p className="section-subtitle">Select a team to begin their funding journey</p>
        </div>

        <div className="team-list">
          {gameState.teams.map((team) => (
            <div 
              key={team.id} 
              className="team-item"
              onClick={() => handleTeamClick(team.id)}
            >
              <div className="team-left">
                <div className="team-number">#{team.id}</div>
                <div className="team-info">
                  <h3 className="team-name">{team.name}</h3>
                  <div className="team-progress">
                    {team.finalScores.filter(s => s !== null).length}/8 Rounds Completed
                  </div>
                </div>
              </div>
              
              <div className="team-right">
                <div className="grand-total-container">
                  <span className="grand-total-label">Grand Total</span>
                  <span className="grand-total-value">{getGrandTotal(team).toFixed(2)}</span>
                </div>
                <button className="btn btn-go-team">
                  GO
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Pune Startup Fest. All rights reserved.</p>
        <p className="footer-credit">Made by Web & Tech Team</p>
      </footer>
    </div>
  );
};

export default TeamList;