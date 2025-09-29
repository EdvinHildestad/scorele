# Scorele 🎯

A modern, responsive Python Flask web application for tracking your daily quiz game scores. Perfect for tracking your performance in Wordle, Wørdle, Wordle Geographic, Travle, Bandle, and other daily puzzle games.

## Features

- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎮 **Multi-Game Support**: Track scores for Wordle, Wørdle, Wordle Geographic, Travle, and Bandle
- 📊 **Statistics Tracking**: View your total games, success rate, and average tries
- 💾 **File-Based Storage**: All data is stored in JSON files on the server
- ❌ **Failed Games**: Easy one-click option to record failed attempts
- 🗑️ **Score Management**: Delete individual scores with confirmation
- 🌐 **Flask Backend**: Python Flask application with server-side logic
- 💬 **Flash Messages**: User feedback for all actions

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

## Installation and Setup

### Prerequisites
- Python 3.7+
- pip (Python package installer)

### Local Development

1. **Clone the repository**:
```bash
git clone https://github.com/EdvinHildestad/scorele.git
cd scorele
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run the application**:
```bash
python app.py
```

4. **Open your browser** and go to: `http://localhost:5000`

### Deployment

#### Azure Static Web Apps
The project can be deployed to Azure as a Python web app using Azure App Service.

#### Other Platforms
- **Heroku**: Compatible with Heroku Python buildpack
- **Digital Ocean**: Deploy as Python app
- **AWS**: Use Elastic Beanstalk or EC2
- **Railway**: Direct deployment support

## Technical Details

- **Backend**: Python Flask 2.3.3
- **Frontend**: HTML5, CSS3, minimal JavaScript
- **Storage**: JSON file-based storage (`scores.json`)
- **Styling**: Modern CSS with gradients and responsive design
- **Fonts**: Inter font family from Google Fonts
- **Architecture**: Server-side rendering with Flask templates

## Project Structure

```
scorele/
├── app.py                    # Main Flask application
├── requirements.txt          # Python dependencies
├── scores.json              # Data storage (created automatically)
├── templates/
│   └── index.html           # Main HTML template
├── static/
│   ├── styles.css           # CSS styling
│   └── manifest.json        # PWA manifest
└── README.md               # This file
```

## API Endpoints

- `GET /` - Main application page
- `POST /add_score` - Add a new score
- `POST /delete_score/<index>` - Delete a score
- `GET /api/stats` - Get statistics as JSON

## Browser Support

Works in all modern browsers that support:
- HTML5 form elements
- CSS Grid and Flexbox
- Basic JavaScript (minimal usage)

## Data Storage

Scores are stored in a `scores.json` file with the following structure:
```json
[
  {
    "game": "wordle",
    "tries": 3,
    "date": "2025-09-29",
    "success": true,
    "timestamp": "2025-09-29T12:00:00"
  }
]
```

---

Built with ❤️ using Python Flask for daily puzzle game enthusiasts!