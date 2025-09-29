from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
import os
from datetime import datetime
from typing import List, Dict, Any

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Data storage file
SCORES_FILE = 'scores.json'

class ScoreTracker:
    def __init__(self):
        self.scores_file = SCORES_FILE
    
    def load_scores(self) -> List[Dict[str, Any]]:
        """Load scores from JSON file"""
        if os.path.exists(self.scores_file):
            try:
                with open(self.scores_file, 'r') as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError):
                return []
        return []
    
    def save_scores(self, scores: List[Dict[str, Any]]) -> None:
        """Save scores to JSON file"""
        try:
            with open(self.scores_file, 'w') as f:
                json.dump(scores, f, indent=2)
        except IOError:
            print("Error saving scores to file")
    
    def add_score(self, game: str, tries: int, date: str, success: bool = True) -> bool:
        """Add a new score"""
        scores = self.load_scores()
        
        # Check if score already exists for this game and date
        for i, score in enumerate(scores):
            if score['game'] == game and score['date'] == date:
                # Replace existing score
                scores[i] = {
                    'game': game,
                    'tries': tries,
                    'date': date,
                    'success': success,
                    'timestamp': datetime.now().isoformat()
                }
                self.save_scores(scores)
                return True
        
        # Add new score
        new_score = {
            'game': game,
            'tries': tries,
            'date': date,
            'success': success,
            'timestamp': datetime.now().isoformat()
        }
        scores.append(new_score)
        self.save_scores(scores)
        return True
    
    def delete_score(self, index: int) -> bool:
        """Delete a score by index"""
        scores = self.load_scores()
        if 0 <= index < len(scores):
            scores.pop(index)
            self.save_scores(scores)
            return True
        return False
    
    def get_statistics(self) -> Dict[str, Any]:
        """Calculate and return statistics"""
        scores = self.load_scores()
        total_games = len(scores)
        successful_games = len([s for s in scores if s['success']])
        success_rate = round((successful_games / total_games) * 100) if total_games > 0 else 0
        
        # Calculate average tries (only for successful games)
        successful_scores = [s for s in scores if s['success']]
        avg_tries = round(sum(s['tries'] for s in successful_scores) / len(successful_scores), 1) if successful_scores else 0
        
        return {
            'total_games': total_games,
            'success_rate': success_rate,
            'avg_tries': avg_tries
        }
    
    def get_sorted_scores(self) -> List[Dict[str, Any]]:
        """Get scores sorted by date (newest first)"""
        scores = self.load_scores()
        return sorted(scores, key=lambda x: x['date'], reverse=True)

# Initialize score tracker
score_tracker = ScoreTracker()

# Game display names
GAME_NAMES = {
    'wordle': 'Wordle',
    'worlde': 'Wørdle',
    'wordle-geo': 'Wordle (Geographic)',
    'travle': 'Travle',
    'bandle': 'Bandle'
}

@app.route('/')
def index():
    """Main page"""
    scores = score_tracker.get_sorted_scores()
    stats = score_tracker.get_statistics()
    today = datetime.now().strftime('%Y-%m-%d')
    
    return render_template('index.html', 
                         scores=scores, 
                         stats=stats, 
                         today=today,
                         game_names=GAME_NAMES,
                         enumerate=enumerate)

@app.route('/add_score', methods=['POST'])
def add_score():
    """Add a new score"""
    game = request.form.get('game')
    tries = request.form.get('tries')
    date = request.form.get('date')
    failed = request.form.get('failed') == 'true'
    
    # Validation
    if not game or not date:
        flash('Please fill in all required fields.', 'error')
        return redirect(url_for('index'))
    
    if failed:
        # Failed game
        success = False
        tries_int = 0
    else:
        # Successful game
        try:
            tries_int = int(tries)
            if tries_int < 1 or tries_int > 6:
                flash('Number of tries must be between 1 and 6.', 'error')
                return redirect(url_for('index'))
            success = True
        except (ValueError, TypeError):
            flash('Invalid number of tries.', 'error')
            return redirect(url_for('index'))
    
    # Add the score
    if score_tracker.add_score(game, tries_int, date, success):
        game_name = GAME_NAMES.get(game, game)
        if success:
            flash(f'Score added: {game_name} - {tries_int} tries', 'success')
        else:
            flash(f'Score added: {game_name} - Failed', 'success')
    else:
        flash('Error adding score. Please try again.', 'error')
    
    return redirect(url_for('index'))

@app.route('/delete_score/<int:index>', methods=['POST'])
def delete_score(index):
    """Delete a score"""
    if score_tracker.delete_score(index):
        flash('Score deleted successfully.', 'success')
    else:
        flash('Error deleting score.', 'error')
    
    return redirect(url_for('index'))

@app.route('/api/stats')
def api_stats():
    """API endpoint for statistics (for AJAX updates if needed)"""
    return jsonify(score_tracker.get_statistics())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)