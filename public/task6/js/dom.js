
var options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

window.module = (function () {

    let getUser = function () {
        return moduleF.getUser();
    }
    let setUser = function (newUser) {
        moduleF.setUser(newUser);
    }

    let getAllUsers = function() {
        return moduleF.getAllUsers();
    }

    var user = localStorage.getItem('currentUser') === 'undefined' ? null : getUser();

    let tape = document.getElementsByClassName('Tape');

    let getAllPosts = function() {
        photoPosts = moduleF.getAllPosts();
        return photoPosts;
    }
    let setAllPosts = function(posts) {
        moduleF.setAllPosts(posts);
    }

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
                <p class="user-name">` + user + `</p>
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
        else link = `/public/task6/${post.photoLink}`;
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
        if (moduleF.addPhotoPost(photoPost)) {
            createPhotoPost(photoPost);
            return true;
        } else return false;
    }

    let clearTape = function () {
        tape.innerHTML = '';
    }

    let getPhotoPost = function(id) {
        return moduleF.getPhotoPost(id);
    }
    
    let getPhotoPosts = function (skip, top, filterConfig) {
        let posts = moduleF.getPhotoPosts(skip, top, filterConfig);
        count = posts.length;
        posts.forEach(element => {
            tape.appendChild(createPhotoPost(element));
        });
    }

    let removePhotoPost = function (id) {
        if (moduleF.removePhotoPost(id)) {
            tape.removeChild(document.getElementById(id));
            return true;
        }
        else return false;
    }

    let editPhotoPost = function (id, photoPost) {
        if (moduleF.editPhotoPost(id, photoPost)) {
            tape.replaceChild(createPhotoPost(moduleF.getPhotoPost(id)), document.getElementById(id));
            return true;
        }
        return false;
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
    setHTML.setMainPage(module.getUser());
    module.changeUser(module.getUser());
}
console.log(module.getUser());

let dmy = new Date();
let lc = document.querySelector('.lc');
lc.innerHTML = 'Date of last change: ' + dmy.toLocaleString("en", options);
