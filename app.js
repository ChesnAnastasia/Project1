const methods = require('./server/js/index');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('./public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getCountOfPosts', (req, res) => {
    const count = JSON.stringify(methods.getCountOfPosts());
    if (count !== undefined) {
        res.status(200).send(count);
    } else res.status(400).send('Error').end();
});

app.get('/getPhotoPost', (req, res) => {
    if (req.query.id) {
        const post = methods.getPhotoPost(req.query.id);
        if (post) {
            res.status(200).send(post);
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});


app.post('/getPhotoPosts', (req, res) => {
    const skip = parseInt(req.query.skip, 10);
    const top = parseInt(req.query.top, 10);
    if (req.query.skip && req.query.top && (JSON.stringify(req.body) === '{}')) {
        const posts = methods.getPhotoPosts(skip, top);
        if (posts) {
            res.status(200).send(posts);
        } else res.status(400).send('Error').end();
    } else if (req.query.skip && req.query.top && JSON.stringify(req.body) !== '{}') {
        const posts = methods.getPhotoPosts(skip, top, req.body);
        if (posts) {
            res.status(200).send(posts);
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

app.post('/addPhotoPost', (req, res) => {
    if (JSON.stringify(req.body) !== '{}') {
        const post = req.body;
        post.createdAt = new Date(post.createdAt);
        if (methods.addPhotoPost(post)) {
            res.status(200).send('PhotoPost added');
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

app.put('/editPhotoPost', (req, res) => {
    if (req.query.id) {
        if (methods.editPhotoPost(req.query.id, req.body)) {
            res.status(200).send('PhotoPost edited');
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

app.delete('/removePhotoPost', (req, res) => {
    console.log(req.query.id);
    if (req.query.id) {
        if (methods.removePhotoPost(req.query.id)) {
            console.log('good');
            res.status(200).send('PhotoPost removed');
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

const server = app.listen(3000, () => console.log(`Server on port  ${server.address().port}`));
