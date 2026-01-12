import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';
// 🔥 FIREBASE IMPORTS
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const ResultPage = ({ gameState, updateGameState }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [showResult, setShowResult] = useState(false);
  const [wheelProgress, setWheelProgress] = useState(100);

  const calculatedScore = gameState.calculatedScore;

  useEffect(() => {
    if (!calculatedScore) {
      navigate('/');
      return;
    }

    // Countdown from 8 to 0
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [calculatedScore, navigate]);

  // Wheel animation after countdown
  useEffect(() => {
    if (showResult) {
      const maxScore = calculatedScore.baseScore * 3; // Maximum possible score
      const targetPercentage = Math.min((calculatedScore.finalScore / maxScore) * 100, 100);
      
      // Animate from 100% down to target percentage
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      
      const animateWheel = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentProgress = 100 - (100 - targetPercentage) * easeOut;
        
        setWheelProgress(currentProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateWheel);
        }
      };
      
      animateWheel();
    }
  }, [showResult, calculatedScore]);

  // 🔥 SAVE RESULT TO FIRESTORE + MOVE TO NEXT ROUND
  const handleNext = async () => {
    const currentTeam = gameState.teams.find(
      t => t.id === gameState.currentTeam
    );

    try {
      await addDoc(collection(db, "fund_arcade_results"), {
        teamId: currentTeam.id,
        teamName: currentTeam.name,
        round: gameState.currentRound + 1,
        baseScore: calculatedScore.baseScore,
        multiplier: calculatedScore.multiplier,
        riskFactor: calculatedScore.riskFactor,
        finalScore: calculatedScore.finalScore,
        createdAt: Timestamp.now()
      });

      console.log("🔥 Result saved to Firebase");
    } catch (error) {
      console.error("❌ Firebase save failed:", error);
    }

    const updatedTeams = gameState.teams.map(team => {
      if (team.id === gameState.currentTeam) {
        const newFinalScores = [...team.finalScores];
        newFinalScores[gameState.currentRound] = calculatedScore.finalScore;
        return { ...team, finalScores: newFinalScores };
      }
      return team;
    });

    const teamId = gameState.currentTeam;

    updateGameState({
      teams: updatedTeams,
      currentTeam: null,
      currentRound: null,
      currentBaseScore: 0,
      selectedOption: null,
      calculatedScore: null
    });

    navigate(`/rounds/${teamId}`);
  };

  if (!calculatedScore) return null;

  const currentTeam = gameState.teams.find(
    t => t.id === gameState.currentTeam
  );

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

      <main className="main-content result-main">
        <div className="result-info">
          <div className="team-round-info">
            <span className="info-badge-result">{currentTeam.name}</span>
            <span className="info-badge-result">Round {gameState.currentRound + 1}</span>
          </div>
        </div>

        {!showResult ? (
          <div className="suspense-container">
            <h2 className="suspense-title">CALCULATING YOUR FATE...</h2>
            
            <div className="countdown-wheel">
              <svg className="wheel-svg" viewBox="0 0 200 200">
                <circle
                  className="wheel-track"
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                />
                <circle
                  className="wheel-progress-suspense"
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#gradient-suspense)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
                <defs>
                  <linearGradient id="gradient-suspense" x1="0%" y1="0%" x2="100%" y2="100%">
                    <animate attributeName="x1" values="0%;100%;0%" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="y1" values="0%;100%;0%" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="x2" values="100%;0%;100%" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="100%;0%;100%" dur="3s" repeatCount="indefinite" />
                    <stop offset="0%" stopColor="#00ff9d" />
                    <stop offset="50%" stopColor="#00aeff" />
                    <stop offset="100%" stopColor="#ff4757" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="countdown-number">{countdown}</div>
            </div>

            <div className="calculation-info">
              <div className="calc-item">
                <span className="calc-label">Base Score:</span>
                <span className="calc-value">{calculatedScore.baseScore}</span>
              </div>
              <div className="calc-divider">×</div>
              <div className="calc-item">
                <span className="calc-label">Multiplier:</span>
                <span className="calc-value">{calculatedScore.multiplier}×</span>
              </div>
              <div className="calc-divider">×</div>
              <div className="calc-item">
                <span className="calc-label">Risk Factor:</span>
                <span className="calc-value">???</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="result-container">
            <h2 className="result-title">FINAL SCORE</h2>
            
            <div className="score-wheel-container">
              <svg className="score-wheel-svg" viewBox="0 0 300 300">
                <circle
                  className="wheel-background"
                  cx="150"
                  cy="150"
                  r="130"
                  fill="rgba(26, 31, 58, 0.8)"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="4"
                />
                <circle
                  className="wheel-track"
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="20"
                />
                <circle
                  className="wheel-progress-result"
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="url(#gradient-result)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={`${(wheelProgress / 100) * 754} 754`}
                  transform="rotate(-90 150 150)"
                />
                <defs>
                  <linearGradient id="gradient-result" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00ff9d" />
                    <stop offset="50%" stopColor="#00aeff" />
                    <stop offset="100%" stopColor="#ff4757" />
                  </linearGradient>
                </defs>
                <text
                  x="150"
                  y="140"
                  textAnchor="middle"
                  className="wheel-score"
                  fill="#ffffff"
                  fontSize="48"
                  fontWeight="900"
                  fontFamily="Audiowide, cursive"
                >
                  {calculatedScore.finalScore.toFixed(2)}
                </text>
                <text
                  x="150"
                  y="170"
                  textAnchor="middle"
                  className="wheel-percentage"
                  fill="rgba(255, 255, 255, 0.6)"
                  fontSize="20"
                  fontWeight="600"
                  fontFamily="Rajdhani, sans-serif"
                >
                  {wheelProgress.toFixed(0)}%
                </text>
              </svg>
            </div>

            <div className="result-breakdown">
              <h3 className="breakdown-title">Calculation Breakdown</h3>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <span className="breakdown-label">Base Score</span>
                  <span className="breakdown-value">{calculatedScore.baseScore}</span>
                </div>
                <div className="breakdown-operator">×</div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Multiplier</span>
                  <span className="breakdown-value">{calculatedScore.multiplier}×</span>
                </div>
                <div className="breakdown-operator">×</div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Risk Factor</span>
                  <span className="breakdown-value">{calculatedScore.riskFactor}</span>
                </div>
                <div className="breakdown-operator">=</div>
                <div className="breakdown-item final">
                  <span className="breakdown-label">Final Score</span>
                  <span className="breakdown-value highlight">{calculatedScore.finalScore.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-next" onClick={handleNext}>
              Next Round
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Pune Startup Fest. All rights reserved.</p>
        <p className="footer-credit">Made by Web & Tech Team</p>
      </footer>
    </div>
  );
};

export default ResultPage;
