const serverPath = './server/photoPosts.json';
const methods = require('./public/task6/js/index');

const fs = require('fs');
const path = require('path');
const  express = require('express');
var bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(`./public`));

router.route('/:params*').get((req, res) => {res.sendFile(path.resolve(`public/${req.path}`))});

app.get('/', (req, res) => res.sendFile(path.resolve('./public/task6/index.html')));
app.use('/public', router);

/*
var photoPosts = [
    {
        id: '1',
        description: 'Austria, Wien',
        createdAt: new Date(2017, 03, 13, 16, 51),
        author: 'Mary',
        photoLink: '5.jpg',
        likes: [],
        tags: ['#travel']
    },
    {
        id: '2',
        description: 'Russia, Sankt-Peterburg',
        createdAt: new Date(2017, 06, 07, 12, 49),
        author: 'ChesnAnastasia',
        photoLink: '4.jpg',
        likes: [],
        tags: ['#travel', '#beauty']
    }, 
    {
        id: '3',
        description: 'Hungary, Pech',
        createdAt: new Date(2017, 09, 26, 16, 05),
        author: 'Mary',
        photoLink: '3.jpg',
        likes: [],
        tags: ['#travel', '#beauty', '#happiness']
    },
    {
        id: '4',
        description: 'Hungary, Pech',
        createdAt: new Date(2017, 09, 26, 18, 24),
        author: 'ChesnAnastasia',
        photoLink: '2.jpg',
        likes: [],
        tags: ['#happiness', '#travel']
    },
    {
        id: '5',
        description: 'Hungary, Pech',
        createdAt: new Date(2017, 09, 26, 16, 52),
        author: 'Kate',
        photoLink: '1.jpg',
        likes: [],
        tags: ['#happiness', '#beauty']
    }
];//localStorage.getItem('arrOfPosts');
fs.writeFileSync(path, JSON.stringify(photoPosts));
*/

//for(method in methods) { [].__proto__[method]=methods[method]; }



app.get("/photoPost/:id", (req, res) => {
    const posts = JSON.parse(fs.readFileSync(serverPath));
    const result = methods.getPhotoPost.call(
        { photoPosts: posts },
        req.params.id
    );
    console.log(req.params.id);
    if (result) {
        res.status(200).send(JSON.stringify(result));
    } else {
        res.status(400).end();
    }
})


app.get('/photoPosts', (req, res) => {
    photoPosts = JSON.parse(fs.readFileSync(path), (key, value) => {
        if (key == 'createdAt') return new Date(value);
        return value;
    });
    //console.log(photoPosts);
    res.send(photoPosts);
});

app.get('/photoPosts/:id', (req, res) => {
    photoPosts = JSON.parse(fs.readFileSync(path), (key, value) => {
        if (key == 'createdAt') return new Date(value);
        return value;
    });
    let s = req.params.id;
    console.log(s);
    console.log(typeof(s));
    //console.log(req.params.id);
    //console.log(typeof(req.params.id));
    //let s = req.params.id;
    console.log(s.length);
    let post = moduleFgetPhotoPost(req.params.id);//photoPosts.find((photo) => {return photo.id === req.params.id});
    console.log(post);
    res.send(post);
});

//добавление
app.post('/photoPosts', (req, res) => {
    photoPosts = JSON.parse(fs.readFileSync(path), (key, value) => {
        if (key == 'createdAt') return new Date(value);
        return value;
    });
    let post = req.body;
    photoPosts.push(post);
    fs.writeFileSync(path, JSON.stringify(photoPosts));
    res.send(photoPosts);
});
//обновление edit
app.put('/photoPosts/:id', (req, res) => {
    let photoPosts = JSON.parse(fs.readFileSync(path));
    let post = photoPosts.find((photo) => {return photo.id === req.params.id});
    post.description = req.body.description;
    //res.sendStatus(200);
    fs.writeFileSync(path, JSON.stringify(photoPosts));
    res.send(post);
});
//удаление
app.delete('/photoPosts/:id', (req, res) => {
    let photoPosts = JSON.parse(fs.readFileSync(path));
    photoPosts = photoPosts.filter((post) => {return post.id !== req.params.id});
    fs.writeFileSync(path, JSON.stringify(photoPosts));
    res.send(photoPosts);
    //res.sendStatus(200);
});

const server = app.listen(3000, () => console.log('server on posrt 3000!'));