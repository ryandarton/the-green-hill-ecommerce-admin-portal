const loginForm = document.getElementById('login-form');
console.log('login form is seen');

let loginFormHandler = async (event) => {
  event.preventDefault();

  console.log('login form is seen');

  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  if (email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('RESPONSE', response);

    if (response.ok) {
      window.location.replace('/');
    } else {
      alert('Log in Failed');
    }
  }
};

document.getElementById('login-form').addEventListener('submit', loginFormHandler);
