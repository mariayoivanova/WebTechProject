document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Modal functionality
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

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (allButtons && searchBar && searchInput && searchClose) {
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
    }

    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const commentName = document.getElementById('commentName').value;
            const commentText = document.getElementById('commentText').value;

            console.log("Submitting comment:", { name: commentName, text: commentText });

            fetch('/comments', {
                method: 'POST',
                body: JSON.stringify({ name: commentName, text: commentText }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
              .then(data => {
                  console.log('Response from server:', data);
                  if (data.success) {
                      loadComments();
                      commentForm.reset();
                  } else {
                      alert('Failed to post comment');
                  }
              }).catch(error => {
                  console.error('Error:', error);
              });
        });

        function loadComments() {
            console.log("Loading comments...");
            fetch('/comments')
                .then(response => response.json())
                .then(data => {
                    console.log('Comments loaded:', data);
                    commentsList.innerHTML = ''; // Clear the list before adding new comments
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
                }).catch(error => {
                    console.error('Error loading comments:', error);
                });
        }

        commentsList.addEventListener('click', function(event) {
            if (event.target.classList.contains('edit-btn')) {
                const commentId = event.target.getAttribute('data-id');
                const newText = prompt('Edit your comment:');
                if (newText) {
                    console.log("Editing comment:", commentId, newText);
                    fetch(`/comments/${commentId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ text: newText }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => response.json())
                      .then(data => {
                          if (data.success) {
                              loadComments();
                          } else {
                              alert('Failed to edit comment');
                          }
                      }).catch(error => {
                          console.error('Error editing comment:', error);
                      });
                }
            } else if (event.target.classList.contains('delete-btn')) {
                const commentId = event.target.getAttribute('data-id');
                console.log("Deleting comment:", commentId);
                fetch(`/comments/${commentId}`, {
                    method: 'DELETE'
                }).then(response => response.json())
                  .then(data => {
                      if (data.success) {
                          loadComments();
                      } else {
                          alert('Failed to delete comment');
                      }
                  }).catch(error => {
                      console.error('Error deleting comment:', error);
                  });
            }
        });

        loadComments(); // Load comments when the page loads
    }
});
