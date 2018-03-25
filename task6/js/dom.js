
var options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

window.module = (function () {

    /* photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
        if (key == 'createdAt') return new Date(value);
        return value;
    });
    localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts)); */

    var user = localStorage.getItem('currentUser') === 'undefind' ? null : localStorage.getItem('currentUser');

    let tape = document.getElementsByClassName('Tape');

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
            localStorage.setItem('currentUser', newUser);
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
            localStorage.setItem('currentUser', 'undefind');
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
        newPost.innerHTML = `
        <img class="post-photo" src="` + post.photoLink + `" alt="photo">
        <div class="info-about-post">
            <div class="post-author-tags-description">
                <p>` + post.author + `</p>
                <p class="post-tags">` + arrayToString(post.tags) + `</p>
                <p class="post-description">` + post.description + `</p>
            </div>
            <div class="date-time-icons">
                <div class="icons-block">
                    <i class="like-icon material-icons" onclick="events.handlerLike(this)">${post.likes.includes(user)?'favorite':'favorite_border'}</i>
                    <i class="edit-icon material-icons" onclick="events.handlerEdit(this)">mode_edit</i>
                    <i class="delete-icon material-icons" onclick="events.handlerDelete(this)">delete</i>
                </div>
                <div class="show-likes">
                    <button class="count-likes" onclick = "events.handlerCountLikes()">Show ` + post.likes.length + ` likes</button>
                    <div class="table">
                        <p class="authors-like">` + arrayToString(post.likes) + `</p>
                    </div>
                </div>
                <p>` + post.createdAt.toLocaleString("en", options) + `</p>
            </div>
        </div>`;
        //if (post.likes.length !== 0)

        //let index = post.likes.indexOf(user);
        //if (index !== -1) myclass.querySelector('.like-icon material-icons').innerHTML = 'favorite_border';//style.color = 'rgb(160, 28, 85)';
        //else myclass.querySelector('.like-icon material-icons').style.color = 'rgb(55, 11, 30)';
        /*if (index !== -1) myclass.querySelector('.like-icon material-icons').innerHTML = 'favorite';
        else myclass.querySelector('.like-icon material-icons').innerHTML = 'favorite_border';*/
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

if (localStorage.getItem('currentUser') === 'undefind') {
    setHTML.setMainPage();
    module.changeUser();
}
else {
    setHTML.setMainPage(localStorage.getItem('currentUser'));
    module.changeUser(localStorage.getItem('currentUser'));
}
console.log(localStorage.getItem('currentUser'));

let dmy = new Date();
let lc = document.querySelector('.lc');
lc.innerHTML = 'Date of last change: ' + dmy.toLocaleString("en", options);

/*
module.changeUser();
module.changeUser('ChesnAnastasia');

module.addPhotoPost(post1);
module.addPhotoPost(post2);
module.addPhotoPost(post3);
module.addPhotoPost(post4);
module.addPhotoPost(post5);
module.addPhotoPost(post6);*/
/*
module.removePhotoPost('1');

module.editPhotoPost('2', { tags: ['#travel', '#beauty', '#positive'] });

module.clearTape();
module.getPhotoPosts(1, 3);
module.clearTape();
module.getPhotoPosts(0, photoPosts.length);*/

