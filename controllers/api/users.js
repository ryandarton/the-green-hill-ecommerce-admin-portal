const router = require('express').Router();
const { Customer } = require('../../models');

router.get('/login', (req, res) => {
  res.render('login', { login: true });
});

router.post('/login', async (req, res) => {
  try {
    const loginData = await Customer.findOne({
      where: { email: req.body.email },
    });

    if (!loginData) {
      res.status(400).json({ message: 'Incorrect login, try again.' });
      return;
    }

    const validPassword = await loginData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, try again.' });
    }

    req.session.save(() => {
      req.session.login_id = loginData.id;
      req.session.logged_in = true;
      res.json({ Customer: loginData, message: 'Logged In' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('login', { login: false });
});

router.post('/signup', async (req, res) => {
  try {
    const signUpData = await Customer.create(req.body);

    req.session.save(() => {
      req.session.signup_id = signUpData.id;
      req.session.signed_up = true;
      res.json({ customer: signUpData, message: 'Thanks for signing up! Your now logged in' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully.' });
  });
});

module.exports = router;
