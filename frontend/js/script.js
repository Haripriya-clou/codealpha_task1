document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const dobInput = document.getElementById('dob');
    const calculateBtn = document.getElementById('calculate-btn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const resultSection = document.getElementById('result-section');
    
    const resultYears = document.getElementById('result-years');
    const resultMonths = document.getElementById('result-months');
    const resultDays = document.getElementById('result-days');

    // Set max date to today to prevent future dates from UI
    const today = new Date().toISOString().split('T')[0];
    dobInput.setAttribute('max', today);

    // Theme Management
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update Icon
        const icon = themeToggleBtn.querySelector('i');
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Utility: Show Error
    const showError = (msg) => {
        errorText.textContent = msg;
        errorMessage.classList.remove('hidden');
        errorMessage.style.position = 'relative'; // Remove absolute positioning
        resultSection.classList.add('hidden');
        resultSection.style.position = 'absolute';
    };

    // Utility: Hide Error
    const hideError = () => {
        errorMessage.classList.add('hidden');
        setTimeout(() => {
            if(errorMessage.classList.contains('hidden')) {
                errorMessage.style.position = 'absolute';
            }
        }, 300);
    };

    // Animate Number Counting
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
                // Add pop animation at the end
                obj.classList.remove('animate-pop');
                void obj.offsetWidth; // trigger reflow
                obj.classList.add('animate-pop');
            }
        };
        window.requestAnimationFrame(step);
    };

    // Calculate Age Handler
    calculateBtn.addEventListener('click', async () => {
        const dobValue = dobInput.value;

        // Basic Client-side Validation
        if (!dobValue) {
            showError("Please select your date of birth.");
            return;
        }

        const selectedDate = new Date(dobValue);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            showError("Date of birth cannot be in the future.");
            return;
        }

        hideError();

        // UI Loading State
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        calculateBtn.disabled = true;
        resultSection.classList.add('hidden');

        try {
            // Fetch from Backend
            const response = await fetch('http://localhost:5000/api/calculate-age', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dob: dobValue })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to calculate age.');
            }

            // Success: Update UI
            resultSection.classList.remove('hidden');
            resultSection.style.position = 'relative';
            
            // Animate Numbers
            animateValue(resultYears, 0, data.years, 1000);
            animateValue(resultMonths, 0, data.months, 800);
            animateValue(resultDays, 0, data.days, 800);

        } catch (error) {
            showError(error.message);
        } finally {
            // Reset UI Loading State
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
            calculateBtn.disabled = false;
        }
    });

    // Hide error when input changes
    dobInput.addEventListener('change', hideError);
});
