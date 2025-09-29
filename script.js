// Scorele - Daily Quiz Score Tracker
class ScoreTracker {
    constructor() {
        this.scores = this.loadScores();
        this.initializeApp();
    }

    // Initialize the application
    initializeApp() {
        this.setupEventListeners();
        this.setTodayDate();
        this.updateStats();
        this.displayScores();
    }

    // Set up event listeners
    setupEventListeners() {
        const form = document.getElementById('scoreForm');
        const failedBtn = document.getElementById('failedBtn');
        
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        failedBtn.addEventListener('click', () => this.handleFailedScore());
    }

    // Set today's date as default
    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const game = formData.get('game');
        const tries = parseInt(formData.get('tries'));
        const date = formData.get('date');

        // Validate input
        if (!game || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        if (tries < 1 || tries > 6) {
            alert('Number of tries must be between 1 and 6.');
            return;
        }

        // Check if score already exists for this game and date
        if (this.scoreExists(game, date)) {
            if (!confirm('A score for this game and date already exists. Do you want to replace it?')) {
                return;
            }
            this.removeScore(game, date);
        }

        // Add the score
        this.addScore({
            game,
            tries,
            date,
            success: true,
            timestamp: new Date().toISOString()
        });

        // Reset form
        e.target.reset();
        this.setTodayDate();
        
        // Update display
        this.updateStats();
        this.displayScores();
    }

    // Handle failed score
    handleFailedScore() {
        const game = document.getElementById('game').value;
        const date = document.getElementById('date').value;

        if (!game || !date) {
            alert('Please select a game and date first.');
            return;
        }

        // Check if score already exists
        if (this.scoreExists(game, date)) {
            if (!confirm('A score for this game and date already exists. Do you want to replace it?')) {
                return;
            }
            this.removeScore(game, date);
        }

        // Add failed score
        this.addScore({
            game,
            tries: 0,
            date,
            success: false,
            timestamp: new Date().toISOString()
        });

        // Reset form
        document.getElementById('scoreForm').reset();
        this.setTodayDate();
        
        // Update display
        this.updateStats();
        this.displayScores();
    }

    // Add a score
    addScore(score) {
        this.scores.push(score);
        this.saveScores();
    }

    // Check if score exists for game and date
    scoreExists(game, date) {
        return this.scores.some(score => score.game === game && score.date === date);
    }

    // Remove a score by game and date
    removeScore(game, date) {
        this.scores = this.scores.filter(score => !(score.game === game && score.date === date));
        this.saveScores();
    }

    // Delete a score by index
    deleteScore(index) {
        if (confirm('Are you sure you want to delete this score?')) {
            this.scores.splice(index, 1);
            this.saveScores();
            this.updateStats();
            this.displayScores();
        }
    }

    // Update statistics
    updateStats() {
        const totalGames = this.scores.length;
        const successfulGames = this.scores.filter(score => score.success).length;
        const successRate = totalGames > 0 ? Math.round((successfulGames / totalGames) * 100) : 0;
        
        // Calculate average tries (only for successful games)
        const successfulScores = this.scores.filter(score => score.success);
        const avgTries = successfulScores.length > 0 
            ? (successfulScores.reduce((sum, score) => sum + score.tries, 0) / successfulScores.length).toFixed(1)
            : 0;

        // Update DOM
        document.getElementById('totalGames').textContent = totalGames;
        document.getElementById('successRate').textContent = `${successRate}%`;
        document.getElementById('avgTries').textContent = avgTries;
    }

    // Display scores
    displayScores() {
        const scoresList = document.getElementById('scoresList');
        
        if (this.scores.length === 0) {
            scoresList.innerHTML = '<div class="empty-state">No scores recorded yet. Add your first score above!</div>';
            return;
        }

        // Sort scores by date (newest first)
        const sortedScores = [...this.scores].sort((a, b) => new Date(b.date) - new Date(a.date));

        scoresList.innerHTML = sortedScores.map((score, index) => {
            const originalIndex = this.scores.indexOf(score);
            return `
                <div class="score-item">
                    <div class="score-info">
                        <span class="game-name">${this.getGameDisplayName(score.game)}</span>
                        <span class="score-tries ${score.success ? '' : 'failed'}">
                            ${score.success ? `${score.tries} tries` : 'Failed'}
                        </span>
                        <span class="score-date">${this.formatDate(score.date)}</span>
                    </div>
                    <button class="delete-btn" onclick="scoreTracker.deleteScore(${originalIndex})">🗑️</button>
                </div>
            `;
        }).join('');
    }

    // Get display name for game
    getGameDisplayName(game) {
        const gameNames = {
            'wordle': 'Wordle',
            'worlde': 'Wørdle',
            'wordle-geo': 'Wordle (Geographic)',
            'travle': 'Travle',
            'bandle': 'Bandle'
        };
        return gameNames[game] || game;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Load scores from localStorage
    loadScores() {
        try {
            const stored = localStorage.getItem('scorele-scores');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading scores:', error);
            return [];
        }
    }

    // Save scores to localStorage
    saveScores() {
        try {
            localStorage.setItem('scorele-scores', JSON.stringify(this.scores));
        } catch (error) {
            console.error('Error saving scores:', error);
            alert('Failed to save score. Please try again.');
        }
    }

    // Export scores as JSON
    exportScores() {
        const dataStr = JSON.stringify(this.scores, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `scorele-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Import scores from JSON file
    importScores(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedScores = JSON.parse(e.target.result);
                if (Array.isArray(importedScores)) {
                    this.scores = importedScores;
                    this.saveScores();
                    this.updateStats();
                    this.displayScores();
                    alert('Scores imported successfully!');
                } else {
                    alert('Invalid file format.');
                }
            } catch (error) {
                alert('Error importing scores. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.scoreTracker = new ScoreTracker();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter or Cmd+Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('scoreForm');
        form.requestSubmit();
    }
});