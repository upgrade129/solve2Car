module.exports = function (router) {
  router.get('/endpoint', (req, res) => {
    try {
      const prodEndpoint = 'https://carkee.solveware.co/api';
      const qaEndpoint = 'https://carkee-staging.solveware.co/api';
      const prodVersions = process.env.PRODVERSION.split(',');
      const qaVersions = process.env.QAVERSION.split(',');
      if (prodVersions.includes(req.query.version))
        return res.send({
          code: 200,
          status: true,
          endpoint: prodEndpoint,
        });
      if (qaVersions.includes(req.query.version))
        return res.send({
          code: 200,
          status: true,
          endpoint: qaEndpoint,
        });
      else throw new Error();
    } catch (e) {
      res.status(400).send({
        status: false,
        message: 'Unrecognized version',
      });
    }
  });
};
