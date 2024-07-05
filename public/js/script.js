document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function() {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        });
    }

    searchClose.addEventListener('click', function() {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
    });

    // Modal Logic
    const modal = document.getElementById("subscribeModal");
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    if (!sessionStorage.getItem('subscribed')) {
        setTimeout(function() {
            modal.style.display = "block";
        }, 1000);
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Set session storage on form submit
    const subscribeForm = document.querySelector('#subscribeModal form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function() {
            sessionStorage.setItem('subscribed', 'true');
        });
    }
});
