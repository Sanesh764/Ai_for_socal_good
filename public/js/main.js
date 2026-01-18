/**
 * Main JavaScript - Campus Compass
 * General functionality and enhancements
 */

(function() {
    'use strict';

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initKeyboardNavigation();
        initFormValidation();
        announcePageLoad();
    });

    // Enhanced keyboard navigation
    function initKeyboardNavigation() {
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
        
        interactiveElements.forEach(function(element) {
            // Ensure elements have proper tabindex
            if (!element.hasAttribute('tabindex') && element.disabled) {
                element.setAttribute('tabindex', '-1');
            }
        });

        // Handle escape key to close modals or reset forms
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open modals or reset focus
                const activeElement = document.activeElement;
                if (activeElement && activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                    // Optionally clear input on Escape
                }
            }
        });
    }

    // Form validation enhancements
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                // Basic HTML5 validation will handle most cases
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Focus first invalid field
                    const firstInvalid = form.querySelector(':invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }, false);
        });
    }

    // Announce page load to screen readers
    function announcePageLoad() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            // Create a live region for announcements
            let announcer = document.getElementById('page-announcer');
            if (!announcer) {
                announcer = document.createElement('div');
                announcer.id = 'page-announcer';
                announcer.className = 'sr-only';
                announcer.setAttribute('role', 'status');
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                document.body.appendChild(announcer);
            }

            const pageTitle = document.title || 'Campus Compass';
            announcer.textContent = 'Page loaded: ' + pageTitle;
            
            // Clear after announcement
            setTimeout(function() {
                announcer.textContent = '';
            }, 1000);
        }
    }

    // Utility: Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Utility: Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Make utilities available globally if needed
    window.CampusCompass = {
        debounce: debounce,
        escapeHtml: escapeHtml
    };
})();
