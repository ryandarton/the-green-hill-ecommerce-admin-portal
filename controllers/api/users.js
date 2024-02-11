const router = require('express').Router();
const Admin = require('../../models/Admin');

// router.get('/', (req, res) => {
//   res.render('login', { login: true });
// });

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

// router.get('/signup', (req, res) => {
//   res.render('login', { login: false });
// });

// router.post('/signup', async (req, res) => {
//   try {
//     const signUpData = await Customer.create(req.body);

//     req.session.save(() => {
//       req.session.signup_id = signUpData.id;
//       req.session.signed_up = true;
//       res.json({ customer: signUpData, message: 'Thanks for signing up! Your now logged in' });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.json({ message: 'Logged out successfully.' });
//   });
// });

module.exports = router;
