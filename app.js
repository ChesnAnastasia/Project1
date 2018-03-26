const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

router.route('/:params*')
    .get((req, res) => {res.sendFile(path.resolve('public/' + req.path))});

app.get('/', (req, res) => res.sendFile(path.resolve('./public/task6/index.html')));

app.use('/public', router);

const server = app.listen(3000, ()=>console.log('server on posrt 3000!'));