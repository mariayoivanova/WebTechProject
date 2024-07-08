document.addEventListener('DOMContentLoaded', function() {
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

    const subscribeForm = document.getElementById("subscribeForm");
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(subscribeForm);
            const firstName = formData.get('firstName');
            const email = formData.get('email');

            fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify({ firstName, email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log('Response from server:', data);
                if (data.success) {
                    sessionStorage.setItem('subscribed', 'true');
                    subscribeForm.innerHTML = '<p>Thank you for subscribing!</p>';
                    setTimeout(() => {
                        modal.style.display = "none";
                    }, 2000);
                } else {
                    subscribeForm.innerHTML = '<p>' + data.message + '</p>';
                }
            }).catch(error => {
                console.error('Error:', error);
                subscribeForm.innerHTML = '<p>There was an error, please try again.</p>';
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function(){

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
  
    for (var i = 0; i < allButtons.length; i++) {
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
  
  
  });

  document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.closest('.form-group').querySelector('label');
            label.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                const label = input.closest('.form-group').querySelector('label');
                label.classList.remove('focused');
            }
        });
    });
});