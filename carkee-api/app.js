'use strict';

const app = require('./src/loaders/expressModule');
const db = require('./src/models');
const port = process.env.PORT || 3000;
app.get('/api', (req, res) => {
  return res.status(200).send('Carkee api health check');
});

app.get('/healthz', (req, res) => {
  return res.json({ message: 'Carkee api health check' });
});
// db.sequelize.sync().then((req) => {
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// })
db.sequelize.sync().then((req) => console.log('Db Synced Succesful!'));
var server = app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = server;