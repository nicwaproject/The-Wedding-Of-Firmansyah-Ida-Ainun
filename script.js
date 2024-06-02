document.addEventListener("DOMContentLoaded", function() {
    // Function to get URL parameters
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set couple names from URL parameter or use default
    const coupleNames = getQueryParameter('couple');
    if (coupleNames) {
        document.getElementById('coupleNames').textContent = coupleNames;
    } else {
        document.getElementById('coupleNames').textContent = 'Imam & Ainun'; // Default names
    }

    // Set guest name from URL parameter or use default
    const guestName = getQueryParameter('guest');
    if (guestName) {
        document.getElementById('guestName').textContent = guestName;
    } else {
        document.getElementById('guestName').textContent = 'Guest';
    }

    // Variables for the invitation and music
    const openButton = document.getElementById('openButton');
    const invitationCover = document.getElementById('invitationCover');
    const invitationContent = document.getElementById('invitationContent');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');
    const audioControls = document.querySelector('.audio-controls');
    let isPlaying = false;

    // Event listener to open the invitation and start music
    openButton.addEventListener('click', function() {
        invitationCover.style.display = 'none';
        invitationContent.style.display = 'flex';
        audioControls.style.display = 'block'; // Show the audio controls
        togglePlayPause();
    });

    // Function to toggle play/pause for the music
    function togglePlayPause() {
        if (isPlaying) {
            backgroundMusic.pause();
            playPauseButton.src = 'play.png'; // Change this to the path of your play button image
        } else {
            backgroundMusic.play();
            playPauseButton.src = 'pause.png'; // Change this to the path of your pause button image
        }
        isPlaying = !isPlaying;
    }

    // Event listener for the play/pause button
    playPauseButton.addEventListener('click', togglePlayPause);

    // .........................................Countdown Timer
    function calculateCountdown() {
        const weddingDate = new Date('2024-06-15'); // Set your wedding date here
        const currentDate = new Date();
        let timeRemaining = weddingDate - currentDate;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    setInterval(calculateCountdown, 1000);
    calculateCountdown();


    // ...................................Function to copy account details
    function copyAccountDetails() {
        const accountDetails = document.querySelector('.bank-number').innerText;
        navigator.clipboard.writeText(accountDetails)
            .then(() => {
                alert('Account details copied!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    // ..........................................Event listener for message form submission
    document.getElementById('messageForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('formGuestName').value;
        const message = document.getElementById('guestMessage').value;

        if (name && message) {
            addMessage(name, message);

            // Clear the form fields
            document.getElementById('formGuestName').value = '';
            document.getElementById('guestMessage').value = '';
        }
    });

    //................................... Function to add messages to the message list
    function addMessage(name, message) {
        const messageList = document.getElementById('messageList');

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const messageName = document.createElement('h3');
        messageName.textContent = name;

        const messageText = document.createElement('p');
        messageText.textContent = message;

        messageDiv.appendChild(messageName);
        messageDiv.appendChild(messageText);
        messageList.appendChild(messageDiv);
    }
});

//................................................. function to show animation 
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = document.querySelectorAll('.fade-in, .fade-slide');
    elements.forEach(element => {
        observer.observe(element);
    });
});
