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
        //photoPosts = module.getAllPosts();

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
            module.getPhotoPosts(0, photoPosts.length, filter);
        }

    }

    function handlerLike(obj) {
        //photoPosts = module.getAllPosts();
        let child1, child2;
        let table;
        console.log(module.user);
        if (module.user !== null) {
            let parent = obj.parentNode;
            parent = parent.parentNode;
            child = parent.getElementsByClassName('count-likes')[0];
            list = parent.getElementsByClassName('authors-like')[0];
            parent = parent.parentNode;
            parent = parent.parentNode;

            module.editPhotoPost(parent.id, {userLike: module.user});

            let str = parent.getElementsByClassName('authors-like').value;
            //str = toString(str);
            let likes = [];
            console.log(str);
            console.log('str: ' + typeof(str));
            if (typeof(str) === 'undefined') {
                //count = likes.length + 1;
                child.innerHTML = 'Show ' + 1 + ' likes';
                obj.innerHTML = 'favorite';
                likes = [];
                likes.push(module.user);
            } else {
                likes = str.split(", ");
                console.log('likes: ' + likes);
                let index = likes.indexOf(module.user);
                if (index !== -1) {
                    likes.push(module.user);
                    child.innerHTML = 'Show ' + likes.length + ' likes';
                    obj.innerHTML = 'favorite_border';
                } else {
                    likes.splice(index, 1);

                    child.innerHTML = 'Show ' + likes.length + ' likes';
                    obj.innerHTML = 'favorite';
                }
            }
            list.innerHTML = arrayToString(likes);

            /*let likes = module.getPhotoPost(parent.id).likes;
            let count;
            let index = likes.indexOf(module.user);
            if (index !== -1) {
                module.editPhotoPost(parent.id, {pushLike: module.user});
                //module.getPhotoPost(parent.id).likes.splice(index, 1);
                count = likes.length + 1;
                child.innerHTML = 'Show ' + count + ' likes';
                obj.innerHTML = 'favorite_border';//style.color = 'rgb(55, 11, 30)';
            } else {
                module.editPhotoPost(parent.id, {popLike: module.user});
                //module.getPhotoPost(parent.id).likes.push(module.user);
                count = likes.length - 1;
                child.innerHTML = 'Show ' + count + ' likes';
                obj.innerHTML = 'favorite';
                //obj.style.color = 'rgb(160, 28, 85)';
            }
            //module.setAllPosts(photoPosts);
            list.innerHTML = arrayToString(module.getPhotoPost(parent.id).likes);*/
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
            if (module.user === module.getPhotoPost(parent.id).author) {
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
        if (module.editPhotoPost(id, post)) {
            console.log(module.getAllPosts());
            module.getPhotoPosts(0, 2);
        }
        //module.editPhotoPost(id, post)
        //module.getPhotoPosts(0, 2);
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

        setHTML.setTapeBlock();

        if (module.addPhotoPost(post)) {
            module.setTape();
            module.getPhotoPosts(1, 1);
        } else {
            setHTML.setAddNewPostPage(new Date());
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
