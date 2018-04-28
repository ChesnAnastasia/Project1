var options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

var currentUser;

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
        return localStorage.getItem('currentUser');
    }
    let setUser = function (newUser) {
        localStorage.setItem('currentUser', newUser);
    }
    let getAllUsers = function () {
        return JSON.parse(localStorage.getItem('arrayOfUsers'));
    }
    let getAllPosts = function () {
        let photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        return photoPosts;
    }
    let setAllPosts = function (posts) {
        localStorage.setItem('arrOfPosts', JSON.stringify(posts));
    }

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

    let setTape = function(){
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
                    <i class="like-icon material-icons" onclick="events.handlerLike(this)">${post.likes.includes(user)?'favorite':'favorite_border'}</i>
                    <i class="edit-icon material-icons" onclick="events.handlerEdit(this)">mode_edit</i>
                    <i class="delete-icon material-icons" onclick="events.handlerDelete(this)">delete</i>
                </div>
                <div class="show-likes">
                    <button class="count-likes">Show ${post.likes.length} likes</button>
                    <div class="table">
                        <p class="authors-like">${arrayToString(post.likes)}</p>
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
                console.log("all good");
                createPhotoPost(photoPost);
            }
            if (xhr.status !== 200) console.log("error");
        } 

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
    
    let getPhotoPosts = function (skip, top, filterConfig) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/getPhotoPosts?skip=${skip}&top=${top}`, true)
        xhr.setRequestHeader('Content-type', 'application/json');
        if (filterConfig) xhr.send(JSON.stringify(filterConfig));
        //else xhr.send();

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
                let posts = JSON.parse(xhr.response, (key, value) => {
                    if (key == 'createdAt') return new Date(value);
                    return value;
                });
                count = posts.length;
                posts.forEach(element => {
                    tape.appendChild(createPhotoPost(element));
                });
            }
            if (xhr.status !== 200) console.log("error");
        } 
        /*
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
        console.log
        xhr.send(JSON.stringify(id));

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
                tape.removeChild(document.getElementById(id));
            }
            if (xhr.status !== 200) console.log("error");
        } 
        /*
        if (moduleF.removePhotoPost(id)) {
            tape.removeChild(document.getElementById(id));
            return true;
        }
        else return false;*/
    }

    let editPhotoPost = function (id, photoPost) {

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', `/editPhotoPost?id=${id}`, true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(photoPost));

        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("all good");
            }
            if (xhr.status !== 200) console.log("error");
        } 
        /*
        if (moduleF.editPhotoPost(id, photoPost)) {
            tape.replaceChild(createPhotoPost(moduleF.getPhotoPost(id)), document.getElementById(id));
            return true;
        }
        return false;*/
    }

    function removeAllChilds(){
        while(tape.innerHTML !== ''){
            tape.removeChild(document.getElementsByClassName('post'));
        }
    }

    return {
        user,
        getUser,
        setUser,
        getAllUsers,
        getAllPosts,
        setAllPosts,
        setTape,
        changeUser,
        createPhotoPost,
        addPhotoPost,
        clearTape,
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
console.log(module.getUser());

let dmy = new Date();
let lc = document.querySelector('.lc');
lc.innerHTML = 'Date of last change: ' + dmy.toLocaleString("en", options);