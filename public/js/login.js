const loginForm = async (event) => {
    event.preventDefault();

 console.log('login form')

    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    if(email && password) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {'Content-Type': 'application/json'},
        });

console.log("RESPONSE", response)

        if (response.ok) {
            window.location.replace('/');
        } else {
            alert('Log in Failed')
        }
    } 
};

document.getElementById('login-form').addEventListener('submit', loginForm);