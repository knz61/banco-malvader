const express = require('express');
const router = express.Router(); // usa o router do express!

router.get('/teste', (req, res) => {
  res.send('Auth funcionando!');
});

module.exports = router;
