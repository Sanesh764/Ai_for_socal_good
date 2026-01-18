/**
 * Accessibility Features JavaScript
 * Handles high contrast, dyslexia mode, and text-to-speech
 */

(function() {
    'use strict';

    // Initialize accessibility features
    function initAccessibility() {
        // Load saved preferences
        loadPreferences();
        
        // Setup event listeners
        setupHighContrast();
        setupDyslexiaMode();
        setupTextToSpeech();
    }

    // High Contrast Mode
    function setupHighContrast() {
        const toggleBtn = document.getElementById('toggle-high-contrast');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', function() {
            const root = document.documentElement;
            const isHighContrast = root.getAttribute('data-high-contrast') === 'true';
            
            if (isHighContrast) {
                root.removeAttribute('data-high-contrast');
                localStorage.setItem('highContrast', 'false');
            } else {
                root.setAttribute('data-high-contrast', 'true');
                localStorage.setItem('highContrast', 'true');
            }
        });
    }

    // Dyslexia-Friendly Mode
    function setupDyslexiaMode() {
        const toggleBtn = document.getElementById('toggle-dyslexia-mode');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', function() {
            const body = document.body;
            const isDyslexiaMode = body.getAttribute('data-dyslexia-mode') === 'true';
            
            if (isDyslexiaMode) {
                body.removeAttribute('data-dyslexia-mode');
                localStorage.setItem('dyslexiaMode', 'false');
            } else {
                body.setAttribute('data-dyslexia-mode', 'true');
                localStorage.setItem('dyslexiaMode', 'true');
            }
        });
    }

    // Text-to-Speech
    let speechSynthesis = null;
    let isSpeaking = false;
    let currentUtterance = null;

    function setupTextToSpeech() {
        // Check if browser supports Web Speech API
        if (!('speechSynthesis' in window)) {
            const ttsBtn = document.getElementById('toggle-tts');
            if (ttsBtn) {
                ttsBtn.disabled = true;
                ttsBtn.title = 'Text-to-speech not supported in this browser';
            }
            return;
        }

        speechSynthesis = window.speechSynthesis;
        const toggleBtn = document.getElementById('toggle-tts');
        
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', function() {
            if (isSpeaking) {
                stopSpeaking();
            } else {
                startSpeaking();
            }
        });

        // Auto-read main content when TTS is activated
        const ttsObserver = new MutationObserver(function(mutations) {
            if (isSpeaking && document.body.getAttribute('data-tts-active') === 'true') {
                // Optionally re-read when content changes
            }
        });

        ttsObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function startSpeaking() {
        if (!speechSynthesis) return;

        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Get all text content
        const text = mainContent.innerText || mainContent.textContent;
        
        if (!text || text.trim().length === 0) {
            alert('No content to read aloud.');
            return;
        }

        // Stop any current speech
        speechSynthesis.cancel();

        // Create utterance
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.rate = 1.0;
        currentUtterance.pitch = 1.0;
        currentUtterance.volume = 1.0;
        currentUtterance.lang = document.documentElement.lang || 'en-US';

        currentUtterance.onstart = function() {
            isSpeaking = true;
            document.body.setAttribute('data-tts-active', 'true');
            updateTTSButton();
        };

        currentUtterance.onend = function() {
            isSpeaking = false;
            document.body.removeAttribute('data-tts-active');
            updateTTSButton();
        };

        currentUtterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
            isSpeaking = false;
            document.body.removeAttribute('data-tts-active');
            updateTTSButton();
        };

        speechSynthesis.speak(currentUtterance);
    }

    function stopSpeaking() {
        if (speechSynthesis) {
            speechSynthesis.cancel();
        }
        isSpeaking = false;
        document.body.removeAttribute('data-tts-active');
        updateTTSButton();
    }

        function updateTTSButton() {
            const toggleBtn = document.getElementById('toggle-tts');
            if (!toggleBtn) return;

            if (isSpeaking) {
                toggleBtn.setAttribute('aria-label', 'Stop text-to-speech');
                toggleBtn.title = 'Stop text-to-speech';
                toggleBtn.querySelector('span').textContent = '⏸️';
            } else {
                toggleBtn.setAttribute('aria-label', 'Start text-to-speech');
                toggleBtn.title = 'Text-to-Speech';
                toggleBtn.querySelector('span').textContent = '🔊';
            }
        }

    // Load saved preferences from localStorage
    function loadPreferences() {
        // High contrast
        const highContrast = localStorage.getItem('highContrast');
        if (highContrast === 'true') {
            document.documentElement.setAttribute('data-high-contrast', 'true');
        }

        // Dyslexia mode
        const dyslexiaMode = localStorage.getItem('dyslexiaMode');
        if (dyslexiaMode === 'true') {
            document.body.setAttribute('data-dyslexia-mode', 'true');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccessibility);
    } else {
        initAccessibility();
    }
})();
