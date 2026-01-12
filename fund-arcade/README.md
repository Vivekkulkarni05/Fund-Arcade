# Fund Arcade - Pune Startup Fest 2026

A professional, interactive fund management game built with React for Pune Startup Fest 2026. Teams compete across 5 rounds with different risk strategies to maximize their final scores.

## 🎮 Game Overview

**Fund Arcade** is a strategic decision-making game where 5 teams compete through 5 rounds each (25 total games). The game consists of 4 pages:

### Page 1: Team List
- View all 5 teams with their names
- See grand total score for each team
- Click on any team to enter their rounds

### Page 2: Round Selection
- View all 5 rounds for the selected team
- Enter base scores for each round
- Rounds unlock sequentially (complete Round 1 to unlock Round 2, etc.)
- See final scores after each round is completed

### Page 3: Strategy Selection
- Choose between three strategies:
  - **A: Safe Acquisition** - Low risk, stable returns
  - **B: Merger & Expansion** - Medium risk, balanced returns
  - **C: IPO Attempt** - High risk, high potential returns

### Page 4: Result Page
- 8-second suspense countdown animation
- View calculated final score with animated wheel
- See detailed calculation breakdown
- Return to round selection for next round

### Scoring Formula
```
Final Score = Base Score × Multiplier × Risk Factor
```

### Strategy Options

#### A: Safe Acquisition
- **Multiplier (M)**: 1×
- **Risk Factor (R)**: 1.0 (no risk variation)
- A stable, predictable exit with limited upside.

#### B: Merger & Expansion
- **Multiplier (M)**: 2.0×
- **Risk Factor (R)**: Based on public roll
  - Successful Integration → R = 1.0
  - Synergy Loss → R = 0.6
- Balanced risk and reward.

#### C: IPO Attempt
- **Multiplier (M)**: 3.0×
- **Risk Factor (R)**: Based on public roll
  - Strong Reception → R = 1.0
  - Mild Reception → R = 0.5
  - IPO Failure → R = 0.0
- Highest potential return with highest volatility.

## 🚀 Project Structure

```
fund-arcade/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── TeamList.js         # Page 1: List of teams
│   │   ├── TeamList.css
│   │   ├── RoundSelection.js   # Page 2: Round selection for team
│   │   ├── RoundSelection.css
│   │   ├── OptionSelection.js  # Page 3: Strategy selection
│   │   ├── OptionSelection.css
│   │   ├── ResultPage.js       # Page 4: Result display
│   │   └── ResultPage.css
│   ├── App.js                  # Main app with routing
│   ├── App.css                 # Global app styles
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## 💻 Setup Instructions (Windows)

### Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- VS Code (recommended) - [Download here](https://code.visualstudio.com/)

### Installation Steps

1. **Open Command Prompt or PowerShell** in the project directory

2. **Navigate to the project folder**
   ```bash
   cd fund-arcade
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually navigate to `http://localhost:3000`

### Alternative: Using VS Code

1. Open the `fund-arcade` folder in VS Code
2. Open the integrated terminal (View → Terminal or `Ctrl + ``)
3. Run the following commands:
   ```bash
   npm install
   npm start
   ```

## 🎯 How to Play

### Phase 1: Team List (Page 1)
1. View all 5 teams with their grand total scores
2. Click on any team's "GO" button to enter their rounds

### Phase 2: Round Selection (Page 2)
1. Enter base scores for each round (must be > 0)
2. Rounds unlock sequentially - complete Round 1 before Round 2, etc.
3. Click "Play Round" to proceed to strategy selection
4. View completed rounds' final scores

### Phase 3: Strategy Selection (Page 3)
1. Review your team's current round and base score
2. Choose one of three strategies (A, B, or C)
3. Each strategy has different multipliers and risk factors
4. Click "Confirm Selection" to calculate results

### Phase 4: Results (Page 4)
1. Watch an 8-second countdown animation
2. The risk factor is randomly determined based on your selected strategy
3. View the animated score wheel showing your final score
4. See the detailed calculation breakdown
5. Click "Next Round" to return to round selection

### Game Features

✅ **4-Page Structure**: Clean separation of team selection, round management, strategy choice, and results

✅ **Sequential Round Progression**: Each team must complete rounds in order (R1 → R2 → R3 → R4 → R5)

✅ **Visual Indicators**:
- 🔒 Locked rounds (not yet accessible)
- ✓ Completed rounds (final score recorded)
- ● Active rounds (ready to play)

✅ **Score Tracking**: View total scores and progress for each team

✅ **Professional Animations**: Smooth, non-intrusive animations throughout

## 🎨 Design Features

- **Modern UI**: Cyberpunk-inspired design with gradient effects
- **Professional Typography**: Custom fonts (Rajdhani, Electrolize, Audiowide)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: CSS-based animations for professional feel
- **Color Scheme**: 
  - Primary: Cyan-green gradient (#00ff9d to #00aeff)
  - Background: Dark blue (#0a0e27)
  - Accents: Orange (#ffa500) and Red (#ff4757)

## 🛠️ Technologies Used

- **React 18.2**: Modern UI framework
- **React Router DOM 6.20**: Client-side routing for 4-page navigation
- **CSS3**: Custom styling with animations
- **Google Fonts**: Professional typography

## 📝 Additional Features

### Header
- Game title: "FUND ARCADE"
- Event name: "Pune Startup Fest '26"

### Footer
- Copyright: "© 2026 Pune Startup Fest. All rights reserved."
- Credit: "Made by Web & Tech Team"

## 🐛 Troubleshooting

### Issue: `npm install` fails
- **Solution**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Issue: Port 3000 already in use
- **Solution**: Either close the application using port 3000, or set a different port:
  ```bash
  set PORT=3001 && npm start
  ```

### Issue: Application doesn't open automatically
- **Solution**: Manually navigate to `http://localhost:3000` in your browser

### Issue: Styles not loading properly
- **Solution**: Clear browser cache (Ctrl + F5) and refresh the page

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## 👥 Team Information

Created for **Pune Startup Fest 2026**

Developed by the **Web & Tech Team**

## 📄 License

© 2026 Pune Startup Fest. All rights reserved.

---

## 🎉 Enjoy the Game!

For any issues or questions, please contact the Web & Tech Team.
