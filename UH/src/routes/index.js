const /*router*/ express = require('express')/*.Router()*/;
const router = express.Router();
// ruta de inicio y acerca de la App
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;

