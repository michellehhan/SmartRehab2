# SmartRehab - AI-driven Neuromuscular Health Dashboard

A React-based frontend application for real-time monitoring and analysis of neuromuscular health using AI-driven insights.

## Features

### 🏃‍♂️ Real-Time Movement Dashboard
- **3D Avatar Visualization**: Real-time body position and movement tracking
- **EMG Signal Charts**: Live electrical muscle activity monitoring across muscle groups
- **Health Heatmaps**: Color-coded overlays showing deviations from baseline
  - 🟢 Green = Healthy range
  - 🟡 Yellow = Mild deviation  
  - 🔴 Red = Concerning levels
- **Movement Metrics**: Gait stability, movement smoothness, and compensation level tracking

### 🚨 Early Warning Alerts
- **Smart Notifications**: Automatic detection of abnormal patterns (tremors, instability, muscle weakness)
- **Severity Levels**: Low/Medium/High classification with timestamps
- **Action Recommendations**: Suggested next steps for each alert
- **Notifications Center**: Collapsible sidebar with alert history and management

### ⚙️ Adaptive Thresholds
- **Customizable Settings**: User/clinician adjustable thresholds for all metrics
- **Auto-Calibration**: Intelligent baseline adjustment over time
- **Population Comparison**: User baseline vs. population norms analysis
- **Real-time Tuning**: Live threshold adjustment with immediate feedback

### 🎨 Modern UI/UX
- **Three-Panel Layout**:
  - Left sidebar → Navigation + alerts center
  - Center panel → Real-time dashboard + avatar + metrics
  - Right sidebar → Threshold controls + trend summary
- **Dark/Light Mode**: Seamless theme switching
- **Mobile Responsive**: Optimized for all device sizes
- **Smooth Animations**: Framer Motion powered transitions

## Tech Stack

- **React 18** - Modern functional components with hooks
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Recharts** - Interactive data visualization
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Vite** - Fast development and build tool

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SmartRehab

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── card.jsx
│   │   ├── button.jsx
│   │   ├── slider.jsx
│   │   └── ...
│   ├── MovementDashboard.jsx    # Real-time movement visualization
│   ├── AlertsCenter.jsx         # Notification management
│   └── ThresholdControls.jsx    # Settings panel
├── lib/
│   └── utils.js            # Utility functions
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Key Components

### MovementDashboard
- Real-time EMG signal visualization
- 2D avatar with movement tracking
- Muscle activity heatmaps
- Health metric progress indicators

### AlertsCenter  
- Notification management system
- Severity-based alert categorization
- Timestamp and action tracking
- Bulk dismiss functionality

### ThresholdControls
- Adaptive threshold configuration
- Population norm comparisons
- Auto-calibration settings
- Real-time parameter adjustment

## Data Flow

1. **Real-time Simulation**: Mock EMG and movement data generation
2. **Threshold Monitoring**: Continuous comparison against user-defined limits
3. **Alert Generation**: Automatic notification creation for anomalies
4. **Visual Feedback**: Live updates to charts, avatar, and health indicators
5. **User Interaction**: Threshold adjustment and alert management

## Customization

### Theme Configuration
The app uses CSS custom properties for theming. Modify `src/index.css` to customize colors:

```css
:root {
  --primary: 142 76% 36%;        /* Green primary color */
  --secondary: 210 40% 98%;      /* Light secondary */
  --destructive: 0 84.2% 60.2%;  /* Red for alerts */
  /* ... */
}
```

### Adding New Metrics
1. Update the `metrics` state in `App.jsx`
2. Add visualization in `MovementDashboard.jsx`
3. Configure thresholds in `ThresholdControls.jsx`

## Performance Considerations

- **Real-time Updates**: Optimized with 200ms intervals
- **Data Management**: Sliding window approach for EMG data (50 points max)
- **Animation Performance**: Hardware-accelerated CSS transforms
- **Memory Usage**: Automatic cleanup of old data points

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
