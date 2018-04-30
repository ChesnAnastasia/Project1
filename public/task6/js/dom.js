var options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

window.module = (function () {

    /*let getUser = function() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/getUser', true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        let user;
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
                console.log('getUser_good: ' + xhr.response);
                //user = xhr.response;
                return xhr.response;
            }
            if (xhr.status !== 200) {
                console.log("error");
            }
        }
        console.log();
        console.log('getUser: _x_' + xhr.response);
        console.log('getUser: _u_' + user);
        return user;

    }
    let setUser = function(newUser) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', '/setUser', true)
        xhr.setRequestHeader('Content-type', 'application/json');
        //console.log('nU: ' + newUser);
        //console.log('jsnU: ' + JSON.stringify(newUser));
        xhr.send(JSON.stringify(newUser));

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
            }
            if (xhr.status !== 200) console.log("error");
        }
    }

    let getAllUsers = function () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/getAllUsers', true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        let us;
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
                console.log(xhr.response);
                us = xhr.response;
                return xhr.response;
            }
            if (xhr.status !== 200) console.log("error");
        }
        console.log(xhr.onload);
        console.log(us);
        //return moduleF.getAllUsers();
    }*/

    let getUser = function () {
        if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', 'undefined');
        return localStorage.getItem('currentUser');
    }
    let setUser = function (newUser) {
        localStorage.setItem('currentUser', newUser);
    }
    let getAllUsers = function () {
        if (!localStorage.getItem('arrayOfUsers')) {
            const users = [
                {
                    login: 'ChesnAnastasia',
                    password: '30041999'
                },
                {
                    login: 'Mary',
                    password: 'hello13'
                },
                {
                    login: 'Ivan Ivanov',
                    password: '123456'
                },
                {
                    login: 'Eliz',
                    password: 'bsu123'
                },
                {
                    login: 'Kate',
                    password: '098765'
                }];
            localStorage.setItem('arrayOfUsers', json.stringify(users));
        }
        return JSON.parse(localStorage.getItem('arrayOfUsers'));
    }
    /*let getAllPosts = function () {
        let photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        return photoPosts;
    }*/

    var user = localStorage.getItem('currentUser') === 'undefined' ? null : getUser();

    let tape = document.getElementsByClassName('Tape');

    /*let getAllPosts = function () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/getAllPosts', true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
                return xhr.response;
            }
            if (xhr.status !== 200) console.log("error");
        }
        return moduleF.getAllPosts();
    }
    let setAllPosts = function (posts) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', '/setAllUsers', true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
            }
            if (xhr.status !== 200) console.log("error");
        }
        //moduleF.setAllPosts(posts);
    }*/

    let setTape = function () {
        tape = document.getElementsByClassName('Tape')[0];
    }

    let changeUser = function (newUser) {
        let User = document.querySelector('.User');
        if (newUser !== null && typeof newUser === 'string' && newUser !== '') {
            this.user = newUser;
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
            setUser(newUser);
        } else {
            this.user = null;
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
            setUser('undefined');
        }
        tape.innerHTML = '';
        setTape();
        getPhotoPosts(0, 2);
    }

    let createPhotoPost = function (post) {
        var classes = document.getElementsByClassName("Tape");
        let myclass = classes[0];
        let newPost = document.createElement('div');
        newPost.id = post.id;
        newPost.className = 'post';
        let link;
        if (post.photoLink.substring(0, 5) === 'http:') link = post.photoLink;
        else link = post.photoLink;
        newPost.innerHTML = `
        <img class="post-photo" src="${link}" alt="photo">
        <div class="info-about-post">
            <div class="post-author-tags-description">
                <p>${post.author}</p>
                <p class="post-tags">${arrayToString(post.tags)}</p>
                <p class="post-description">${post.description}</p>
            </div>
            <div class="date-time-icons">
                <div class="icons-block">
                    <i class="like-icon material-icons" onclick="events.handlerLike(this)">${post.likes.includes(user) ? 'favorite' : 'favorite_border'}</i>
                    <i class="edit-icon material-icons" onclick="events.handlerEdit(this)">mode_edit</i>
                    <i class="delete-icon material-icons" onclick="events.handlerDelete(this)">delete</i>
                </div>
                <div class="show-likes">
                    <button class="count-likes">Show ${post.likes.length} likes</button>
                    <div class="table">
                        <p class="authors-like" value="${arrayToString(post.likes)}"></p>
                    </div>
                </div>
                <p>${post.createdAt.toLocaleString("en", options)}</p>
            </div>
        </div>`;

        myclass.appendChild(newPost);
        return newPost;
    }
    let addPhotoPost = function (photoPost) {

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/addPhotoPost', true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(photoPost));

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('add-All good');
            }
            if (xhr.status !== 200) console.log('add-Error');
        }
        createPhotoPost(photoPost);

        /*
        if (moduleF.addPhotoPost(photoPost)) {
            createPhotoPost(photoPost);
            return true;
        } else return false;
        */
    }
    let clearTape = function () {
        tape.innerHTML = '';
    }

    let getPhotoPost = function (id) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/getPhotoPost?id=${id}`, true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('getPost-All good');
                localStorage.setItem('post', xhr.response);
            }
            if (xhr.status !== 200) console.log('getPost-Error');
        }
        let post = JSON.parse(localStorage.getItem('post'), (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        //console.log(post);
        return post;
    }

    let getPhotoPosts = function (skip, top, filterConfig) {
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/getPhotoPosts?skip=${skip}&top=${top}`, true)
        xhr.setRequestHeader('Content-type', 'application/json');
        if (filterConfig) xhr.send(JSON.stringify(filterConfig));
        else xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('getPosts-All good');
                let posts = JSON.parse(xhr.response, (key, value) => {
                    if (key == 'createdAt') return new Date(value);
                    return value;
                });
                //console.log(posts);
                posts.forEach(element => {
                    tape.appendChild(createPhotoPost(element));
                });
                console.log(posts);
                localStorage.setItem('posts-length', posts.length);
            }
            if (xhr.status !== 200) console.log('getPosts-Error');
        }
        /*const posts = JSON.stringify(localStorage.getItem('posts'), (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        posts.forEach((element) => {
            tape.appendChild(createPhotoPost(element));
        });
        return posts;
        
        let posts = moduleF.getPhotoPosts(skip, top, filterConfig);
        count = posts.length;
        posts.forEach(element => {
            tape.appendChild(createPhotoPost(element));
        });*/
    }

    let removePhotoPost = function (id) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/removePhotoPost?id=${id}`, true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('remove-All good');
                tape.removeChild(document.getElementById(id));
            }
            if (xhr.status !== 200) console.log('remove-Error');
        }
    }

    let editPhotoPost = function (id, photoPost) {

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', `/editPhotoPost?id=${id}`, true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(photoPost));

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('edit-All good');
            }
            if (xhr.status !== 200) console.log('edit-Error');
        }
        //tape.replaceChild(createPhotoPost(getPhotoPost(id)), document.getElementById(id));
        
    }

    function removeAllChilds() {
        while (tape.innerHTML !== '') {
            tape.removeChild(document.getElementsByClassName('post'));
        }
    }

    return {
        user,
        getUser,
        setUser,
        getAllUsers,
        //getAllPosts,
        setTape,
        changeUser,
        createPhotoPost,
        addPhotoPost,
        clearTape,
        getPhotoPost,
        getPhotoPosts,
        removePhotoPost,
        editPhotoPost,
        removeAllChilds
    }
})();

if (module.getUser() === 'undefined') {
    setHTML.setMainPage();
    module.changeUser();
}
else {
    let user = module.getUser();
    console.log('user: ' + user);
    setHTML.setMainPage(user);
    module.changeUser(user);
}
//console.log(module.getUser());

let dmy = new Date();
let lc = document.querySelector('.lc');
lc.innerHTML = 'Date of last change: ' + dmy.toLocaleString("en", options);