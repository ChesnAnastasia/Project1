const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

let user;

window.module = {

    getUser() {
        if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', 'undefined');
        return localStorage.getItem('currentUser');
    },
    setUser(newUser) {
        localStorage.setItem('currentUser', newUser);
    },
    getAllUsers() {
        if (!localStorage.getItem('arrayOfUsers')) {
            const users = [
                {
                    login: 'ChesnAnastasia',
                    password: '30041999',
                },
                {
                    login: 'Mary',
                    password: 'hello13',
                },
                {
                    login: 'Ivan Ivanov',
                    password: '123456',
                },
                {
                    login: 'Eliz',
                    password: 'bsu123',
                },
                {
                    login: 'Kate',
                    password: '098765',
                }];
            localStorage.setItem('arrayOfUsers', JSON.stringify(users));
        }
        return JSON.parse(localStorage.getItem('arrayOfUsers'));
    },

    setTape() {
        const tape = document.getElementsByClassName('Tape')[0];
        return tape;
    },

    changeUser(newUser) {
        const User = document.querySelector('.User');
        if (newUser !== null && typeof newUser === 'string' && newUser !== '') {
            window.user = newUser;
            user = newUser;
            User.innerHTML = `
            <div class="user-profile">
                <p class="user-name">${user}</p>
            </div>
            <div class="buttons">
                <button class="b2" onclick="eventsMainPage.handlerAddNewPost()">Add new post</button>
                <button class="b3" onclick="eventsMainPage.handlerLogOut()">Log out</button>
            </div>`;
            User.style.height = '80px';
            User.style.margin = '65px 0 0 0';
            this.setUser(newUser);
        } else {
            window.user = null;
            user = null;
            User.innerHTML = `
            <div class="user-profile">
                <p class="user-name">Guest</p>
            </div>
            <div class="buttons">
                <button class="b4" onclick="eventsMainPage.handlerLogIn()">Log in</button>
            </div>`;
            User.style.height = '50px';
            User.style.margin = '75px 0 0 0';
            this.setUser('undefined');
        }
        const tape = document.getElementsByClassName('Tape')[0];
        tape.innerHTML = '';
        this.getPhotoPosts(0, 2);
    },

    createPhotoPost(post) {
        const classes = document.getElementsByClassName('Tape');
        const myclass = classes[0];
        const newPost = document.createElement('div');
        newPost.id = post.id;
        newPost.className = 'post';
        const link = post.photoLink;
        let str = 'favorite_border';
        let count = 0;
        if (post.likes !== undefined) {
            str = post.likes.includes(this.getUser()) ? 'favorite' : 'favorite_border';
            count = post.likes.length;
        }
        newPost.innerHTML = `
        <img class="post-photo" src="${link}" alt="photo">
        <div class="info-about-post">
            <div class="post-author-tags-description">
                <p>${post.author}</p>
                <p class="post-tags">${window.arrayToString(post.tags)}</p>
                <p class="post-description">${post.description}</p>
            </div>
            <div class="date-time-icons">
                <div class="icons-block">
                    <i class="like-icon material-icons" onclick="events.handlerLike(this)">${str}</i>
                    <i class="edit-icon material-icons" onclick="events.handlerEdit(this)">mode_edit</i>
                    <i class="delete-icon material-icons" onclick="events.handlerDelete(this)">delete</i>
                </div>
                <div class="show-likes">
                    <button class="count-likes">Show ${count} likes</button>
                    <div class="table">
                        <p class="authors-like" value="${window.arrayToString(post.likes)}"></p>
                    </div>
                </div>
                <p>${post.createdAt.toLocaleString('en', options)}</p>
            </div>
        </div>`;

        myclass.appendChild(newPost);
        return newPost;
    },
    addPhotoPost(photoPost) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/addPhotoPost', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(photoPost));

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('add-All good');
            }
            if (xhr.status !== 200) console.log('add-Error');
        };
        this.createPhotoPost(photoPost);
    },
    clearTape() {
        const tape = document.getElementsByClassName('Tape')[0];
        tape.innerHTML = '';
    },

    getPhotoPost(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/getPhotoPost?id=${id}`, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('getPost-All good');
                localStorage.setItem('post', xhr.response);
            }
            if (xhr.status !== 200) console.log('getPost-Error');
        };
        const post = JSON.parse(localStorage.getItem('post'), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        return post;
    },

    getCountOfPosts() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/getCountOfPosts', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('getCount-All good');
                console.log(xhr.response);
                localStorage.setItem('count', xhr.response);
            }
            if (xhr.status !== 200) console.log('getCount-Error');
        };
        const count = Number(localStorage.getItem('count'));
        return count;
    },

    getPhotoPosts(skip, top, filterConfig) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/getPhotoPosts?skip=${skip}&top=${top}`, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        if (filterConfig) xhr.send(JSON.stringify(filterConfig));
        else xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('getPosts-All good');
                const posts = JSON.parse(xhr.response, (key, value) => {
                    if (key === 'createdAt') return new Date(value);
                    return value;
                });
                const tape = document.getElementsByClassName('Tape')[0];
                posts.forEach((element) => {
                    tape.appendChild(this.createPhotoPost(element));
                });
                console.log(posts);
                localStorage.setItem('posts-length', posts.length);
            }
            if (xhr.status !== 200) console.log('getPosts-Error');
        };
    },

    removePhotoPost(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/removePhotoPost?id=${id}`, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('remove-All good');
                const tape = document.getElementsByClassName('Tape')[0];
                tape.removeChild(document.getElementById(id));
            }
            if (xhr.status !== 200) console.log('remove-Error');
        };
    },

    editPhotoPost(id, photoPost) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `/editPhotoPost?id=${id}`, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(photoPost));

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('edit-All good');
            }
            if (xhr.status !== 200) console.log('edit-Error');
        };
    },

    removeAllChilds() {
        const tape = document.getElementsByClassName('Tape')[0];
        while (tape.innerHTML !== '') {
            tape.removeChild(document.getElementsByClassName('post'));
        }
    },
};

if (module.getUser() === 'undefined') {
    window.setHTML.setMainPage();
    module.changeUser();
} else {
    const us = module.getUser();
    console.log(`user: ${us}`);
    window.setHTML.setMainPage(us);
    module.changeUser(us);
}

const dmy = new Date();
const lc = document.querySelector('.lc');
lc.innerHTML = `Date of last change: ${dmy.toLocaleString('en', options)}`;
