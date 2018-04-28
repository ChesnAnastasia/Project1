//тут дичь??????7777

//const postsPath = './server/data/photoPosts.json';
//const usersPath = './server/data/users.json';
const methods = require('./server/js/index');

//const multer = require('multer');
//const upload = multer();
const  express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static(`./public/task6`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/getPhotoPost", (req, res) => {
    if (req.query.id){
        const post = methods.getPhotoPost(req.query.id);
        console.log(req.params.id);
        console.log(post);
        if (post) {
            res.status(200).send(post);
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

app.post('/getPhotoPosts', (req, res) => {
    console.log(req.body);
    if (req.query.skip && req.query.top && (JSON.stringify(req.body) === '{}')){
        const posts = methods.getPhotoPosts(parseInt(req.query.skip), parseInt(req.query.top));
        if (posts){
            res.status(200).send(posts);
        } else res.status(400).send('Error').end();
    } else if (req.query.skip && req.query.top && JSON.stringify(req.body) !== '{}'){
        const posts = methods.getPhotoPosts(parseInt(req.query.skip), parseInt(req.query.top), req.body);
        if (posts){
            res.status(200).send(posts);
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

app.post('/addPhotoPost', (req, res) => {
    if (JSON.stringify(req.body) !== '{}'){
        const post = req.body;
        post.createdAt = new Date(post.createdAt);
        if (methods.addPhotoPost(post)){
            res.status(200).send('PhotoPost added');
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

app.put('/editPhotoPost', (req, res) => {
    if (req.query.id){
        if (methods.editPhotoPost(req.query.id, req.body)){
            res.status(200).send('PhotoPost edited');
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

app.delete('/removePhotoPost', (req, res) => {
    if (req.query.id){
        if (methods.removePhotoPost(req.query.id)){
            res.status(200).send('PhotoPost removed');
        } else res.status(400).send('Error').end();
    } else {
        res.status(400).send('Error').end();
    }
});

/*
app.get('/getUser', (req, res) => {
    const user = methods.getUser();
    console.log(user);
    if (user){
        res.status(200).send(user);
    } else res.status(400).send('Error').end();
});
app.get('/getAllUsers', (req, res) => {
    const users = methods.getAllUsers();
    if (users) {
        res.status(200).send(users);
    } else res.status(200).send('Error').end();
});
app.get('/getAllPosts', (req, res) => {
    const posts = methods.getAllPosts();
    if (posts){
        res.status(200).send(posts);
    } else res.status(400).send('Error').end();
});

app.put('/setUser', (req, res) => {
    if (methods.setUser(req.body)) {
        res.status(200).send('set user');
    } else res.status(400).send('Error').end();
});
app.put('/setAllPosts', (req, res) => {
    if (methods.setAllPosts(req.body)){
        res.status(200).send('set all posts');
    } else res.status(400).send('Error').end();
});*/

const server = app.listen(3000, () => console.log(`Server on port  ${server.address().port}`));