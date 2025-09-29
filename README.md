# Scorele 🎯

A modern, responsive static web app for tracking your daily quiz game scores. Perfect for tracking your performance in Wordle, Wørdle, Wordle Geographic, Travle, Bandle, and other daily puzzle games.

## Features

- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎮 **Multi-Game Support**: Track scores for Wordle, Wørdle, Wordle Geographic, Travle, and Bandle
- 📊 **Statistics Tracking**: View your total games, success rate, and average tries
- 💾 **Local Storage**: All data is stored locally in your browser
- ❌ **Failed Games**: Easy one-click option to record failed attempts
- 🗑️ **Score Management**: Delete individual scores with confirmation
- 🚀 **Azure Static Web Apps**: Ready for deployment to Azure Static Web Apps

## How to Use

1. **Select a Game**: Choose from the dropdown which daily game you played
2. **Enter Your Score**: Input the number of tries it took you to solve the puzzle (1-6)
3. **Set the Date**: The current date is pre-filled, but you can change it for past scores
4. **Add Score**: Click "Add Score" to save your result
5. **Failed Games**: If you didn't solve the puzzle, just click the "❌ Failed" button

## Statistics

The app automatically calculates and displays:
- **Total Games**: The total number of games you've played
- **Success Rate**: Percentage of games you've successfully completed
- **Average Tries**: Your average number of tries for successful games

## Supported Games

- **Wordle**: The original daily word puzzle
- **Wørdle**: Norwegian version of Wordle
- **Wordle (Geographic)**: Geography-based Wordle variant
- **Travle**: Travel-themed daily puzzle
- **Bandle**: Music-based daily game

## Deployment

This is a static web app that can be easily deployed to:
- Azure Static Web Apps
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

### Azure Static Web Apps

The project includes a `staticwebapp.config.json` file for easy deployment to Azure Static Web Apps.

## Development

To run locally:

```bash
# Clone the repository
git clone https://github.com/EdvinHildestad/scorele.git
cd scorele

# Start a local server
python3 -m http.server 8000
# or
npx serve .

# Open http://localhost:8000 in your browser
```

## Technical Details

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Storage**: Browser LocalStorage
- **Styling**: Modern CSS with gradients and responsive design
- **Fonts**: Inter font family from Google Fonts
- **Progressive Web App**: Includes manifest.json for PWA capabilities

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- LocalStorage API

---

Built with ❤️ for daily puzzle game enthusiasts!