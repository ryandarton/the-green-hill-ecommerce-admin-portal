const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// export default router;
module.exports = router;
