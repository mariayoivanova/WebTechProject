document.addEventListener('DOMContentLoaded', function() {
    // Abonnement-Modal
    const modal = document.getElementById("subscribeModal");
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    if (modal && closeBtn) {
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
    }

    // Abonnement-Formular
    const subscribeForm = document.getElementById("subscribeForm");
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(subscribeForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName'); 
            const email = formData.get('email');

            fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
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
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }
    }

    // Suchleiste
    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (allButtons && searchBar && searchInput && searchClose) {
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
    }

    // Kommentarbereich
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();  // Verhindert das Standardverhalten des Formulars

            const commentName = document.getElementById('commentName').value;
            const commentText = document.getElementById('commentText').value;

            fetch('/comments', {
                method: 'POST',
                body: JSON.stringify({ name: commentName, text: commentText }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.comment) {
                    // Direkt den neuen Kommentar zur Liste hinzufügen
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    commentDiv.innerHTML = `
                        <p class="comment-name"><strong>${data.comment.name}</strong></p>
                        <p class="comment-text">${data.comment.text}</p>
                        <button class="edit-btn" data-id="${data.comment._id}">Edit</button>
                        <button class="delete-btn" data-id="${data.comment._id}">Delete</button>
                    `;
                    commentsList.prepend(commentDiv);  // Fügt den neuen Kommentar oben in der Liste hinzu
                    commentForm.reset();
                } else {
                    alert('Kommentar konnte nicht gepostet werden');
                }
            })
            .catch(error => {
                console.error('Fehler beim Posten des Kommentars:', error);
                alert('Ein Fehler ist beim Posten des Kommentars aufgetreten');
            });
        });

        function loadComments() {
            fetch('/comments')
                .then(response => response.json())
                .then(data => {
                    commentsList.innerHTML = '';
                    data.comments.forEach(comment => {
                        const commentDiv = document.createElement('div');
                        commentDiv.classList.add('comment');
                        commentDiv.innerHTML = `
                            <p class="comment-name"><strong>${comment.name}</strong></p>
                            <p class="comment-text">${comment.text}</p>
                            <button class="edit-btn" data-id="${comment._id}">Edit</button>
                            <button class="delete-btn" data-id="${comment._id}">Delete</button>
                        `;
                        commentsList.appendChild(commentDiv);
                    });
                })
                .catch(error => {
                    console.error('Fehler beim Laden der Kommentare:', error);
                });
        }

        commentsList.addEventListener('click', function(event) {
            if (event.target.classList.contains('edit-btn')) {
                const commentId = event.target.getAttribute('data-id');
                const newText = prompt('Bearbeiten Sie Ihren Kommentar:');
                if (newText) {
                    fetch(`/comments/${commentId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ text: newText }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const commentDiv = event.target.parentElement;
                            commentDiv.querySelector('.comment-text').innerText = newText;
                        } else {
                            alert('Kommentar konnte nicht bearbeitet werden');
                        }
                    })
                    .catch(error => {
                        console.error('Fehler beim Bearbeiten des Kommentars:', error);
                    });
                }
            } else if (event.target.classList.contains('delete-btn')) {
                const commentId = event.target.getAttribute('data-id');
                fetch(`/comments/${commentId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const commentDiv = event.target.parentElement;
                        commentDiv.remove();
                    } else {
                        alert('Kommentar konnte nicht gelöscht werden');
                    }
                })
                .catch(error => {
                    console.error('Fehler beim Löschen des Kommentars:', error);
                });
            }
        });

        loadComments();  // Kommentare beim Laden der Seite anzeigen
    }
});
