import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OptionSelection.css';

const OptionSelection = ({ gameState, updateGameState }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const currentTeam = gameState.teams.find(t => t.id === gameState.currentTeam);

  if (!currentTeam) {
    navigate('/');
    return null;
  }

  const options = [
    {
      id: 'A',
      title: 'Safe Acquisition',
      multiplier: 1.0,
      riskFactor: [1.0],
      riskDescription: 'Risk Factor (R): 1.0 (no risk variation)',
      description: 'A stable, predictable exit with limited upside.',
      color: '#008F6B',
      gradient: 'linear-gradient(135deg, #008F6B 0%, #005C45 100%)'
    },
    {
      id: 'B',
      title: 'Merger & Expansion',
      multiplier: 2.0,
      riskFactor: [1.0, 0.6],
      riskDescription: 'Risk Factor (R): Based on public roll\n• Successful Integration → R = 1.0\n• Synergy Loss → R = 0.6',
      description: 'Balanced risk and reward.',
      color: '#D68A00',
      gradient: 'linear-gradient(135deg, #D68A00 0%, #A36600 100%)'
    },
    {
      id: 'C',
      title: 'IPO Attempt',
      multiplier: 3.0,
      riskFactor: [1.0, 0.5, 0.0],
      riskDescription: 'Risk Factor (R): Based on public roll\n• Strong Reception → R = 1.0\n• Mild Reception → R = 0.5\n• IPO Failure → R = 0.0',
      description: 'Highest potential return with highest volatility.',
      color: '#CF2E2E',
      gradient: 'linear-gradient(135deg, #CF2E2E 0%, #961E1E 100%)'
    }
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
  };

  const handleConfirm = () => {
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }

    const option = options.find(opt => opt.id === selectedOption);
    const randomRiskFactor = option.riskFactor[Math.floor(Math.random() * option.riskFactor.length)];
    
    const finalScore = gameState.currentBaseScore * option.multiplier * randomRiskFactor;

    updateGameState({
      selectedOption: option,
      calculatedScore: {
        baseScore: gameState.currentBaseScore,
        multiplier: option.multiplier,
        riskFactor: randomRiskFactor,
        finalScore: finalScore
      }
    });

    navigate('/result');
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

      <main className="main-content options-main">
        <div className="game-info-bar">
          <div className="info-item">
            <span className="info-label">Team:</span>
            <span className="info-value">{currentTeam.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Round:</span>
            <span className="info-value">{gameState.currentRound + 1}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Base Score:</span>
            <span className="info-value">{gameState.currentBaseScore}</span>
          </div>
        </div>

        <div className="options-section">
          <h2 className="options-title">SELECT YOUR STRATEGY</h2>

          <div className="options-grid">
            {options.map((option) => (
              <div
                key={option.id}
                className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                <div className="option-header" style={{ background: option.gradient }}>
                  <div className="option-letter">{option.id}</div>
                  <div className="option-title-text">{option.title}</div>
                </div>

                <div className="option-content">
                  <div className="stat-row">
                    <div className="stat-item">
                      <span className="stat-label">Multiplier (M)</span>
                      <span className="stat-value">{option.multiplier}×</span>
                    </div>
                  </div>

                  <div className="risk-details">
                    <p className="risk-text">{option.riskDescription}</p>
                  </div>

                  <p className="option-description">{option.description}</p>
                </div>

                {selectedOption === option.id && (
                  <div className="selected-indicator">
                    <span className="checkmark">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={() => navigate(`/rounds/${gameState.currentTeam}`)}>
              Back
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleConfirm}
              disabled={!selectedOption}
            >
              Confirm Selection
            </button>
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

export default OptionSelection;
