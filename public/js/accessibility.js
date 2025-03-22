// Accessibility Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if panel already exists
    let panel = document.querySelector('.accessibility-panel');
    
    if (!panel) {
        // Create accessibility panel
        panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.innerHTML = `
            <button class="accessibility-toggle" aria-label="Toggle accessibility options">
                <i class="fas fa-brain"></i>
            </button>
            <div class="accessibility-options">
                <button class="accessibility-option" data-option="hide-images">
                    <i class="fas fa-image"></i>
                    <span>Hide Images</span>
                </button>
                <button class="accessibility-option" data-option="large-text">
                    <i class="fas fa-text-height"></i>
                    <span>Large Text</span>
                </button>
                <button class="accessibility-option" data-option="high-contrast">
                    <i class="fas fa-adjust"></i>
                    <span>High Contrast</span>
                </button>
            </div>
        `;
        document.body.appendChild(panel);
    }

    // Load saved settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
    
    // Apply saved settings
    if (savedSettings.hideImages) {
        document.body.classList.add('hide-images');
        panel.querySelector('[data-option="hide-images"]').classList.add('active');
    }
    if (savedSettings.largeText) {
        document.body.classList.add('large-text');
        panel.querySelector('[data-option="large-text"]').classList.add('active');
    }
    if (savedSettings.highContrast) {
        document.body.classList.add('high-contrast');
        panel.querySelector('[data-option="high-contrast"]').classList.add('active');
    }

    // Toggle panel visibility
    const toggleButton = panel.querySelector('.accessibility-toggle');
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        panel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!panel.contains(e.target)) {
            panel.classList.remove('active');
        }
    });

    // Handle option clicks
    const options = panel.querySelectorAll('.accessibility-option');
    options.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const setting = this.dataset.option;
            
            // Toggle the option
            this.classList.toggle('active');
            
            // Update localStorage and apply changes
            const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
            
            switch(setting) {
                case 'hide-images':
                    document.body.classList.toggle('hide-images');
                    settings.hideImages = this.classList.contains('active');
                    break;
                case 'large-text':
                    document.body.classList.toggle('large-text');
                    settings.largeText = this.classList.contains('active');
                    break;
                case 'high-contrast':
                    document.body.classList.toggle('high-contrast');
                    settings.highContrast = this.classList.contains('active');
                    break;
            }
            
            // Save settings to localStorage
            localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
        });
    });
}); 