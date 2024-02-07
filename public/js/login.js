const loginForm = async (event) => {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    if(email && password) {
        const response = await fetch ('', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Log in Failed')
        }
    }
};

document.getElementById('login-form').addEventListener('submit', loginForm);