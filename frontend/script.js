const API_URL = 'http://localhost:3000';
const form = document.getElementById('appointment-form');
const userList = document.getElementById('user-list');

// Helper to render a user item in the DOM
function displayUser(user) {
  const li = document.createElement('li');
  li.id = `user-${user.id}`;
  li.innerHTML = `
    <span>${user.name} - ${user.email} - ${user.phone}</span>
    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
  `;
  userList.appendChild(li);
}

// 1. Fetch & display all users on initial page load
window.addEventListener('DOMContentLoaded', () => {
  axios.get(`${API_URL}/users`)
    .then((res) => {
      res.data.users.forEach((user) => displayUser(user));
    })
    .catch((err) => console.error('Fetch error:', err));
});

// 2. Submit form to create a new user
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  axios.post(`${API_URL}/user`, { name, email, phone })
    .then((res) => {
      displayUser(res.data.user);
      form.reset();
    })
    .catch((err) => console.error('Create error:', err));
});

// 3. Delete user by ID
function deleteUser(id) {
  axios.delete(`${API_URL}/user/${id}`)
    .then(() => {
      const item = document.getElementById(`user-${id}`);
      if (item) item.remove();
    })
    .catch((err) => console.error('Delete error:', err));
}