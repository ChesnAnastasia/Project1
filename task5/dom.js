var post1 = {
    id: '1',
    description: 'Austria, Wien',
    createdAt: new Date(2017, 03, 13, 16, 51),
    author: 'Mary',
    photoLink: '5.jpg',
    likes: ['ChesnAnastasia', 'Kate'],
    tags: ['#travel']
}
var post2 = {
    id: '2',
    description: 'Russia, Sankt-Peterburg',
    createdAt: new Date(2017, 06, 07, 12, 49),
    author: 'ChesnAnastasia',
    photoLink: '4.jpg',
    likes: ['Mary', 'Kate'],
    tags: ['#travel', '#beauty']
}
var post3 = {
    id: '3',
    description: 'Hungary, Pech',
    createdAt: new Date(2017, 09, 26, 16, 05),
    author: 'Mary',
    photoLink: '3.jpg',
    likes: ['ChesnAnastasia'],
    tags: ['#travel', '#beauty', '#happiness']
}
var post4 = {
    id: '4',
    description: 'Hungary, Pech',
    createdAt: new Date(2017, 09, 26, 18, 24),
    author: 'ChesnAnastasia',
    photoLink: '2.jpg',
    likes: ['Mary', 'Kate'],
    tags: ['#happiness', '#travel']
}
var post5 = {
    id: '5',
    description: 'Hungary, Pech',
    createdAt: new Date(2017, 09, 26, 16, 52),
    author: 'Kate',
    photoLink: '1.jpg',
    likes: ['ChesnAnastasia', 'Mary'],
    tags: ['#happiness', '#beauty']
}
var post6 = {
    id: '5',
    description: 'Hungary, Pech',
    createdAt: new Date(2017, 09, 26, 16, 52),
    author: 'Kate',
    photoLink: '1.jpg',
    likes: ['ChesnAnastasia', 'Mary'],
    tags: ['#happiness', '#beauty']
}

var options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};
let module = (function () {

    let user = null;
    let User = document.querySelector('.User');
    let username = document.querySelector('.user-name');
    let tape = document.querySelector('.Tape');
    let editProfile = document.querySelector('.b1');
    let addPost = document.querySelector('.b2');
    let logOut = document.querySelector('.b3');
    let logIn = document.querySelector('.b4');
    let imgProfile = document.querySelector('.img-profile');

    function profile(b1, b2, b3, b4, img, i) {
        editProfile.style.display = b1;
        addPost.style.display = b2;
        logOut.style.display = b3;
        logIn.style.display = b4;
        imgProfile.style.display = img;
    }

    let changeUser = function (newUser) {
        if (newUser !== null && typeof newUser === 'string' && newUser !== '') {
            this.user = newUser;
            username.innerHTML = this.user;
            profile('', '', '', 'none', '');
            User.style.height = '140px';
            User.style.margin = '50px 0 0 0';
        } else {
            this.user = null;
            username.innerHTML = 'Guest';
            profile('none', 'none', 'none', '', 'none');
            User.style.height = '50px';
            User.style.margin = '85px 0 0 0';
        }
    }

    let createPhotoPost = function (post) {
        var classes = document.getElementsByClassName("Tape");
        let myclass = classes[0];
        let newPost = document.createElement('div');
        newPost.id = post.id;
        newPost.className = 'post';
        newPost.innerHTML = '<img class="post-photo" src="' + post.photoLink + '" alt="photo"><div class="info-about-post"><div class="post-author-tags-description">' +
            '<p>' + post.author + '</p><p class="post-tags">' + post.tags + '</p><p class="post-description">' + post.description + '</p></div>' +
            '<div class="date-time-icons"><div class="icons-block"><i class="like-icon material-icons">favorite_border</i>' +
            '<i class="edit-icon material-icons">mode_edit</i><i class="delete-icon material-icons">delete</i></div>' +
            '<button class="count-likes">Show ' + post.likes.length + ' likes</button>' +
            '<p>' + post.createdAt.toLocaleString("ru", options) + '</p></div></div>';
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
        posts.forEach(item => {
            tape.appendChild(createPhotoPost(item));
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

    return {
        user,
        changeUser,
        addPhotoPost,
        clearTape,
        getPhotoPosts,
        removePhotoPost,
        editPhotoPost

    }
})();

module.changeUser();
module.changeUser('ChesnAnastasia');

module.addPhotoPost(post1);
module.addPhotoPost(post2);
module.addPhotoPost(post3);
module.addPhotoPost(post4);
module.addPhotoPost(post5);
module.addPhotoPost(post6);

module.removePhotoPost('1');

module.editPhotoPost('2', { tags: ['#travel', '#beauty', '#positive'] });

module.clearTape();
module.getPhotoPosts(1, 3);
module.clearTape();
module.getPhotoPosts(0, photoPosts.length);

