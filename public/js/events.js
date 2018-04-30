window.events = (function () {

    function handlerButtonEnter() {
        let users = module.getAllUsers();
        console.log(users);
        let newUser = {};
        newUser.login = document.getElementById('login').value;
        newUser.password = document.getElementById('password').value;

        let isNewUser = false;
        users.forEach(element => {
            if (element.login === newUser.login && element.password === newUser.password) isNewUser = true;
        });

        if (isNewUser) {
            setHTML.setMainPage();
            module.changeUser(newUser.login);
        } else {
            alert(`This user is not registered. Please check the correctness of the entered data. (login length = 3-20 symbols, password length = 6-10 symbols)`);
        }
    }

    function handlerEnter() {
        if (event.keyCode == 13) {
            handlerSearch();
        }
    }
    function handlerSearch() {
        let authorName = document.getElementById('author-name').value;
        let htags = document.getElementById('tags').value;
        let date = document.getElementById('date').value;

        let filter = {};
        if (authorName != '') filter.author = authorName;
        if (date != '') filter.createdAt = new Date(date);
        if (htags != '') {
            filter.tags = htags.match(/\#[a-z0-9_]{1,20}/g);
            if (htags === null) filter.tags = [];
        }

        if (!(authorName == '' && date == '' && htags == '')) {
            setHTML.setTapeBlockForFilter();
            module.setTape();
            //module.removeAllChilds();
            console.log(localStorage.getItem('posts-length'));
            module.getPhotoPosts(0, localStorage.getItem('posts-length'), filter);
        }

    }

    function handlerLike(obj) {
        let child1, child2;
        let table;
        console.log('like-user: ' + module.user);
        if (module.user !== null) {
            let parent = obj.parentNode;
            parent = parent.parentNode;
            child = parent.getElementsByClassName('count-likes')[0];
            list = parent.getElementsByClassName('authors-like')[0];
            parent = parent.parentNode;
            parent = parent.parentNode;

            module.editPhotoPost(parent.id, {userLike: module.user});

            const post = module.getPhotoPost(parent.id);
            console.log(post);
            const index = post.likes.indexOf(module.user);
            if (index !== -1) {
                post.likes.splice(index, 1);
                child.innerHTML = 'Show ' + post.likes.length + ' likes';
                obj.innerHTML = 'favorite_border';
            } else {
                post.likes.push(module.user);
                child.innerHTML = 'Show ' + post.likes.length + ' likes';
                obj.innerHTML = 'favorite';
            }

            list.innerHTML = arrayToString(post.likes);
            
        } else {
            alert(`You can not put like, edit and delete the post. Please login to get this opportunity.`);
        }
    }
    function handlerDelete(obj) {
        if (module.user !== null) {
            let parent = obj.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            const post = module.getPhotoPost(parent.id);
            if (module.user === post.author) {
                module.removePhotoPost(parent.id);
            }
            else alert(`You can not edit and delete posts of other users.`);
        } else {
            alert(`You can not put like, edit and delete the post. Please login to get this opportunity.`);
        }
    }

    let id;
    function handlerEdit(obj) {
        if (module.user !== null) {
            let parent = obj.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            if (module.user === module.getPhotoPost(parent.id).author) {
                setHTML.setEditPostPage(module.getPhotoPost(parent.id));
                id = parent.id;
            } else alert(`You can not edit and delete posts of other users.`);
        } else {
            alert(`You can not put like, edit and delete the post. Please login to get this opportunity.`);
        }
    }
    function handlerSave(obj) {
        let htags = document.getElementById('edit-tags').value;
        let descr = document.getElementById('edit-descriptions').value;
        let link1 = '';
        if (document.getElementById('img-upload2').value) link1 = document.getElementById('img-upload2').files[0].name;
        let link2 = document.getElementById('image-url2').value;

        let post = {};
        if (descr != '') post.description = descr;
        if (link1 !== '') post.photoLink = link1;
        if (link1 === '' && link2 !== '') post.photoLink = link2;
        if (htags != '') post.tags = htags.match(/\#[a-z0-9_]{1,20}/g);

        setHTML.setTapeBlock();
        module.setTape();
        module.editPhotoPost(id, post);
        module.getPhotoPosts(0, 2);
        /*if (module.editPhotoPost(id, post)) {
            //console.log(module.getAllPosts());
            module.getPhotoPosts(0, 2);
        }*/
    }

    function validArr(arr) {
        if (Array.isArray(arr)) {
            return arr.every(function (element) {
                return typeof (element) === 'string';
            });
        }
        return false;
    }
    function validPost(photoPost) {
        if ((!photoPost.description || (photoPost.description && typeof (photoPost.description) === 'string' && photoPost.description.length <= 300))
            && (!photoPost.photoLink || (photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink !== ''))
            && (typeof (photoPost.tags) === 'undefined' || (validArr(photoPost.tags) && photoPost.tags.length <= 30))) {
            return true;
        } else return false;
    }
    function handlerAdd() {
        let htags = document.getElementById('tags').value;
        let descr = document.getElementById('descriptions').value;
        let link1 = '';
        if (document.getElementById('img-upload1').value) link1 = document.getElementById('img-upload1').files[0].name;
        let link2 = document.getElementById('image-url1').value;

        let post = {};

        if (descr != '') post.description = descr;
        if (link1 !== '') post.photoLink = link1;
        if (link1 === '' && link2 !== '') post.photoLink = link2;
        if (htags != '') post.tags = htags.match(/\#[a-z0-9_]{1,20}/g);
        else post.tags = [];

        post.createdAt = new Date();
        post.author = module.user;
        post.likes = [];

        if (validPost(post)) {
            setHTML.setTapeBlock();
            module.setTape();
            module.addPhotoPost(post)
            module.getPhotoPosts(1, 1);
        } else {
            alert("Check the correctness of the entered data.");
        }
    }


    return {
        handlerButtonEnter,
        handlerEnter,
        handlerSearch,
        handlerLike,
        handlerDelete,
        handlerEdit,
        handlerSave,
        handlerAdd
    }
})();
