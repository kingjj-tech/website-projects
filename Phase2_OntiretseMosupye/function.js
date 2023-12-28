// JavaScript code to handle post and reply functionality

// Get the form and discussion thread elements
const postForm = document.getElementById('post-form');
const discussionThread = document.getElementById('discussion-thread');


// Function to create a new post element
function createPostElement(username, department, content) {
  const postElement = document.createElement('div');
  postElement.classList.add('thread-post');

  const userProfile = document.createElement('div');
  userProfile.classList.add('user-profile');

  const userAvatar = document.createElement('img');
  userAvatar.src = 'user_avatar.png';
  userAvatar.alt = 'User Avatar';

  const userNameElement = document.createElement('h3');
  userNameElement.textContent = username;

  const userDeptElement = document.createElement('p');
  userDeptElement.textContent = department;

  userProfile.appendChild(userAvatar);
  userProfile.appendChild(userNameElement);
  userProfile.appendChild(userDeptElement);

  const postContent = document.createElement('p');
  postContent.classList.add('post-content');
  postContent.textContent = content;

  const replyButton = document.createElement('button');
  replyButton.textContent = 'Reply';
  replyButton.classList.add('reply-button');
  replyButton.addEventListener('click', showReplyInput);

  postElement.appendChild(userProfile);
  postElement.appendChild(postContent);
  postElement.appendChild(replyButton);

  return postElement;
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const postContent = document.getElementById('post-content').value;
  if (postContent.trim() !== '') {
    const newPostElement = createPostElement('Uncke Ruckus', 'CTU buddy', postContent);
    discussionThread.appendChild(newPostElement);
    postForm.reset();
  }
}

// Function to show reply input when the "Reply" button is clicked
function showReplyInput(event) {
  const replyButton = event.target;
  const replyInput = document.createElement('input');
  replyInput.setAttribute('type', 'text');
  replyInput.classList.add('reply-input');
  const replySubmitButton = document.createElement('button');
  replySubmitButton.textContent = 'Reply';
  replySubmitButton.classList.add('reply-submit-button');
  replySubmitButton.addEventListener('click', handleReply);

  replyButton.parentElement.appendChild(replyInput);
  replyButton.parentElement.appendChild(replySubmitButton);

  replyButton.removeEventListener('click', showReplyInput);
  replyButton.style.display = 'none';
}

// Function to handle reply submission
function handleReply(event) {
  const replySubmitButton = event.target;
  const replyInput = replySubmitButton.previousElementSibling;
  const replyContent = replyInput.value;
  if (replyContent.trim() !== '') {
    const username = 'Your Name'; // Replace with the actual username
    const department = 'Your Department'; // Replace with the actual department
    const replyElement = createPostElement(username, department, replyContent);
    const parentPost = replySubmitButton.parentElement;
    parentPost.parentElement.insertBefore(replyElement, parentPost.nextElementSibling);
    replyInput.remove();
    replySubmitButton.remove();
    const replyButton = parentPost.querySelector('.reply-button');
    replyButton.addEventListener('click', showReplyInput);
    replyButton.style.display = 'inline-block';
  }
}

// Add form submit event listener
postForm.addEventListener('submit', handleFormSubmit);

