const router = require('express').Router();
const Admin = require('../../models/Admin');

router.get('/login-state', (req, res) => {
  if (req.session.logged_in) {
      res.json({ loggedIn: true });
  } else {
      res.json({ loggedIn: false });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const loginData = await Admin.findOne({
      where: { email: req.body.email },
    });

    console.log('Login data:', loginData);

    if (!loginData) {
      console.log('Incorrect login: User not found');
      res.status(400).json({ message: 'Incorrect login, try again.' });
      return;
    }

    const validPassword = await loginData.checkPassword(req.body.password);

    console.log('Password validation:', validPassword);

    if (!validPassword) {
      console.log('Incorrect password');
      res.status(400).json({ message: 'Incorrect password, try again.' });
      return;
    }

    req.session.save(() => {
      req.session.login_id = loginData.id;
      req.session.logged_in = true;
      console.log('Session saved successfully');
      res.status(200).json({});
      return;
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json(err);
  }
  console.log('hello');
});



router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({})
    } else {
      res.status(200).json({})
    } return;
  });
});

module.exports = router;
