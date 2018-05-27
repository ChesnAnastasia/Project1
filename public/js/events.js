window.events = {

    handlerButtonEnter() {
        const users = module.getAllUsers();
        console.log(users);
        const newUser = {
            login: document.getElementById('login').value,
            password: document.getElementById('password').value,
        };

        let isNewUser = false;
        users.forEach((element) => {
            if (element.login === newUser.login && element.password === newUser.password) {
                isNewUser = true;
            }
        });

        if (isNewUser) {
            window.setHTML.setMainPage();
            module.changeUser(newUser.login);
        } else {
            alert('This user is not registered. Please check the correctness of the entered data. (login length = 3-20 symbols, password length = 6-10 symbols)');
        }
    },

    handlerEnter() {
        if (window.event.keyCode === 13) {
            this.handlerSearch();
        }
    },
    handlerSearch() {
        const authorName = document.getElementById('author-name').value;
        const htags = document.getElementById('tags').value;
        const date = document.getElementById('date').value;

        const filter = {};
        if (authorName !== '') filter.author = authorName;
        if (date !== '') filter.createdAt = new Date(date);
        if (htags !== '') filter.tags = htags.match(/#[a-z0-9_]{1,20}/g);
        else filter.tags = [];

        if (!(authorName === '' && date === '' && htags === '')) {
            window.setHTML.setTapeBlockForFilter();
            module.setTape();
            console.log(localStorage.getItem('posts-length'));
            module.getPhotoPosts(0, Number(localStorage.getItem('posts-length')), filter);
        }
    },

    handlerLike(obj) {
        console.log(`like-user: ${module.getUser()}`);
        if (module.user !== null) {
            const object = obj;
            let parent = obj.parentNode;
            parent = parent.parentNode;
            const child = parent.getElementsByClassName('count-likes')[0];
            const list = parent.getElementsByClassName('authors-like')[0];
            parent = parent.parentNode;
            parent = parent.parentNode;

            module.editPhotoPost(parent.id, { userLike: module.user });

            const post = module.getPhotoPost(parent.id);
            console.log(post);
            const index = post.likes.indexOf(module.user);
            if (index !== -1) {
                post.likes.splice(index, 1);
                child.innerHTML = `Show ' ${post.likes.length} likes`;
                object.innerHTML = 'favorite_border';
            } else {
                post.likes.push(module.user);
                child.innerHTML = `Show ${post.likes.length} likes`;
                object.innerHTML = 'favorite';
            }

            list.innerHTML = window.arrayToString(post.likes);
        } else {
            alert('You can not put like, edit and delete the post. Please login to get this opportunity.');
        }
    },
    handlerDelete(obj) {
        if (module.getUser() !== null) {
            let parent = obj.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            const post = module.getPhotoPost(parent.id);
            if (module.getUser() === post.author) {
                module.removePhotoPost(parent.id);
            } else alert('You can not edit and delete posts of other users.');
        } else {
            alert('You can not put like, edit and delete the post. Please login to get this opportunity.');
        }
    },

    handlerEdit(obj) {
        if (module.getUser() !== null) {
            let parent = obj.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            if (module.getUser() === module.getPhotoPost(parent.id).author) {
                window.setHTML.setEditPostPage(module.getPhotoPost(parent.id));
                localStorage.setItem('id-for-like', parent.id);
            } else alert('You can not edit and delete posts of other users.');
        } else {
            alert('You can not put like, edit and delete the post. Please login to get this opportunity.');
        }
    },
    handlerSave() {
        const htags = document.getElementById('edit-tags').value;
        const descr = document.getElementById('edit-descriptions').value;
        let link1;
        if (document.getElementById('img-upload2').value) link1 = document.getElementById('img-upload2').files[0].name;
        else link1 = '';
        const link2 = document.getElementById('image-url2').value;

        const post = {};
        if (descr !== '') {
            post.description = descr;
        }
        if (link1 !== '') {
            post.photoLink = link1;
        }
        if (link1 === '' && link2 !== '') {
            post.photoLink = link2;
        }
        if (htags !== '') {
            post.tags = htags.match(/#[a-z0-9_]{1,20}/g);
        }

        window.setHTML.setTapeBlock();
        module.setTape();
        module.editPhotoPost(localStorage.getItem('id-for-like'), post);
        module.getPhotoPosts(0, 2);
    },

    validArr(arr) {
        if (Array.isArray(arr)) {
            return arr.every(element => typeof (element) === 'string');
        }
        return false;
    },
    validPost(photoPost) {
        if ((!photoPost.description || (photoPost.description && typeof (photoPost.description) === 'string' && photoPost.description.length <= 300))
            && (!photoPost.photoLink || (photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink !== ''))
            && (typeof (photoPost.tags) === 'undefined' || (this.validArr(photoPost.tags) && photoPost.tags.length <= 30))) {
            return true;
        }
        return false;
    },
    handlerAdd() {
        const htags = document.getElementById('tags').value;
        const descr = document.getElementById('descriptions').value;
        let link1;
        if (document.getElementById('img-upload1').value) link1 = document.getElementById('img-upload1').files[0].name;
        else link1 = '';
        const link2 = document.getElementById('image-url1').value;

        const post = {};
        if (descr !== '') post.description = descr;
        if (link1 !== '') post.photoLink = link1;
        if (link1 === '' && link2 !== '') post.photoLink = link2;
        if (htags !== '') post.tags = htags.match(/#[a-z0-9_]{1,20}/g);
        else post.tags = [];
        post.createdAt = new Date();
        post.author = module.getUser();
        post.likes = [];

        if (this.validPost(post)) {
            window.setHTML.setTapeBlock();
            module.setTape();
            module.addPhotoPost(post);
            module.getPhotoPosts(1, 1);
        } else {
            alert('Check the correctness of the entered data.');
        }
    },
};
