"use strict";

fetch("./data.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        // Get HTML elements
        const RADIO_BTNS = document.querySelectorAll('.header__radio');
        const CARDS = document.querySelectorAll('.card');
       
        // Cards display 'daily' stats by default
        let periodicity = 'daily';
        let currentText = 'Today - ';
        let previousText = 'Yesterday - ';

        // Fills out info on each card, depending on which periodicity is selected
        function updateStats() {
            for (let i = 0; i < CARDS.length; i++) {
                CARDS[i].querySelector('.card__subject').textContent = data[i].title;
                CARDS[i].querySelector('.sr-only').textContent = currentText;
                CARDS[i].querySelector('.card__current-week--figure').textContent = data[i].timeframes[periodicity].current + 'hrs';
                CARDS[i].querySelector('.card__previous').textContent = previousText + data[i].timeframes[periodicity].previous + 'hrs';
            }
        }

        // Listen for change of radio button
        RADIO_BTNS.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.id === 'daily') {
                    periodicity = 'daily';
                    currentText = 'Today - ';
                    previousText = 'Yesterday - ';
                }
                else if (e.target.id === 'weekly') {
                    periodicity = 'weekly';
                    currentText = 'This Week - ';
                    previousText = 'Last Week - ';
                }
                else if (e.target.id === 'monthly') {
                    periodicity = 'monthly';
                    currentText = 'This Month - ';
                    previousText = 'Last Month - ';
                }
                updateStats();
            })
        })

        // Initial call when page loads
        updateStats();
    });