# Cloud9 Draft Assistant - UI

> **Related Repositories:**
> - 🔧 Backend API: [c9-draft-api](https://github.com/AvishKaushik/c9-draft-api)

React-based League of Legends draft simulation and recommendation tool for professional esports teams.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
cd c9-draft-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The UI will be available at `http://localhost:5175`

---

## ⚙️ Configuration

The UI connects to the backend API at `http://localhost:8002` by default.

To change the API URL, update `src/api/draft.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8002/api/v1';
```

---

## ✨ Features

### Draft Board
- **Live Draft Tracking**: Real-time pick/ban interface
- **Ban Phase**: 5 bans per team with visual slots
- **Pick Phase**: 5 picks per team organized by role
- **Champion Search**: Quick champion lookup with live filtering
- **Role Assignment**: Automatic role detection for picks

### AI Recommendations
- Smart pick/ban suggestions for each phase
- Reasoning for each recommendation
- Synergy and counter analysis
- Confidence scoring

### Win Probability
- Dynamic probability meter (0-100%)
- Updates in real-time with each selection
- Visual indicator of draft momentum
- Composition strength feedback

### Draft Simulation
- Practice drafts against AI opponent
- Test different strategies
- See win probability changes
- No pressure environment

### Meta Champions
- Current meta tier list
- Champions organized by role
- Pick/ban rates
- Win rates by position

### Champion Search
- Look up any champion
- View counters and synergies
- Role and tier information
- Recent pro play stats

### Draft History
- Review past professional drafts
- See pick/ban patterns
- Analyze team tendencies
- Import drafts from GRID data

---

## 🏗️ Project Structure

```
c9-draft-ui/
├── public/
│   └── champions/             # Champion splash images
├── src/
│   ├── api/
│   │   └── draft.ts           # API client configuration
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── TabBar.tsx
│   │   ├── GlobalLoadingOverlay.tsx
│   │   ├── DraftBoard.tsx     # Main draft interface
│   │   ├── ChampionGrid.tsx   # Champion selection grid
│   │   ├── BanSlot.tsx        # Ban slot component
│   │   ├── PickSlot.tsx       # Pick slot component
│   │   └── WinProbability.tsx # Probability meter
│   ├── pages/
│   │   ├── DraftBoardTab.tsx
│   │   ├── SimulateTab.tsx
│   │   ├── MetaChampionsTab.tsx
│   │   ├── ChampionSearchTab.tsx
│   │   └── HistoryTab.tsx
│   ├── hooks/
│   │   └── useDraft.ts        # Draft state management
│   ├── types/
│   │   └── draft.ts           # TypeScript definitions
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | TailwindCSS |
| State Management | React Query (TanStack) |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 5175) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🎨 Design System

### Draft Board Layout
- **Blue Side**: Left column (bans top, picks below)
- **Red Side**: Right column (bans top, picks below)
- **Champion Pool**: Center grid with search

### Visual Elements
- Champion splash art from Riot Data Dragon
- Role icons for position clarity
- Team color coding (Blue/Red)
- Animated pick/ban transitions

### Win Probability Meter
- Gradient bar from red (0%) to green (100%)
- Center marker at 50%
- Animated transitions on changes

---

## 🧪 Development

```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build
```

---

## 🖼️ Champion Assets

Champion images are loaded from Riot's Data Dragon CDN:
```
https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/{ChampionName}.png
```

Special handling for champions with spaces/special characters in names (e.g., "Kai'Sa" → "Kaisa").
