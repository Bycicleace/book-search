const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// serve up react front-end in production
// commented out as this was fighting with graphql endpoint
// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

module.exports = router;
