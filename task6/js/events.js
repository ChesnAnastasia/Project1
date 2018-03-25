window.events = (function(){

    function handlerButtonEnter(){
        let newUser = {};
        newUser.login = document.getElementById('login').value;
        newUser.password = document.getElementById('password').value;

        let isNewUser = false;
        users.forEach(element => {
            if (element.login === newUser.login && element.password === newUser.password) isNewUser = true;
        });

        if (isNewUser){
            setHTML.setMainPage();
            module.changeUser(newUser.login);
        } else {
            alert(`This user is not registered. Please check the correctness of the entered data. (login length = 3-20 symbols, password length = 6-10 symbols)`);
        }
    }

    function handlerSearch(obj){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });

        let authorName = document.getElementById('author-name').value;
        let htags = document.getElementById('tags').value;
        let date = document.getElementById('date').value;
        
        let filter = {};
        if (authorName != '' && authorName != null) filter.author = authorName;
        if (date != '' && date != null) filter.createdAt = new Date(date);
        if (htags != '' && htags != null) {
            filter.tags = htags.match(/\#[a-z0-9_]{1,20}/g);
            if (htags === null) filter.tags = [];
        }

        setHTML.setTapeBlockForFilter();
        module.setTape();
        module.getPhotoPosts(0, photoPosts.length, filter);

        /*let parent = obj.parentNode;
        console.log(parent.getElementsByClassName('bshow'));
        console.log(document.getElementsByClassName('bshow'));
        console.log(parent.querySelector('.bshow'));
        console.log(document.querySelector('.bshow'));
        //parent.getElementsByClassName('bshow').innerHTML = '';
        document.querySelector('.bShow').style.display = 'none';*/
        
    }

    function handlerLike(obj){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let child;
        let table;
        console.log(module.user);
        if (module.user !== null){
            let parent = obj.parentNode;
            parent = parent.parentNode;
            child = parent.getElementsByClassName('count-likes');
            list = parent.getElementsByClassName('authors-like');
            parent = parent.parentNode;
            parent = parent.parentNode;
            
            let index = moduleF.getPhotoPost(parent.id).likes.indexOf(module.user);
            if (index !== -1) {
                moduleF.getPhotoPost(parent.id).likes.splice(index, 1);
                child = child[0];
                child.innerHTML = 'Show ' + moduleF.getPhotoPost(parent.id).likes.length + ' likes';
                obj.innerHTML = 'favorite_border';//style.color = 'rgb(55, 11, 30)';
            } else {
                moduleF.getPhotoPost(parent.id).likes.push(module.user);
                child = child[0];
                child.innerHTML = 'Show ' + moduleF.getPhotoPost(parent.id).likes.length + ' likes';
                obj.innerHTML = 'favorite';
                //obj.style.color = 'rgb(160, 28, 85)';
            }
            localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));
            list = list[0];
            list.innerHTML =  moduleF.getPhotoPost(parent.id).likes;
        } else {
            alert(`You can not put like, edit and delete the post. Please login to get this opportunity.`);
        }
    }
    function handlerDelete(obj){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        if (module.user !== null){
            let parent = obj.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            if (module.user === moduleF.getPhotoPost(parent.id).author) {
                module.removePhotoPost(parent.id);
                localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));
            }
            else alert(`You can not edit and delete posts of other users.`);
        } else {
            alert(`You can not put like, edit and delete the post. Please login to get this opportunity.`);
        }
    }

    let id;
    function handlerEdit(obj){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        if (module.user !== null){
            let parent = obj.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            parent = parent.parentNode;
            if (module.user === moduleF.getPhotoPost(parent.id).author) {
                setHTML.setEditPostPage(moduleF.getPhotoPost(parent.id));
                id = parent.id;
            } else alert(`You can not edit and delete posts of other users.`);
        } else {
            alert(`You can not put like, edit and delete the post. Please login to get this opportunity.`);
        }
    }
    function handlerSave(obj){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });

        let htags = document.getElementById('edit-tags').value;
        let descr = document.getElementById('edit-descriptions').value;
        let link = document.getElementById('image-url2').value;

        let parent = obj.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;

        if (descr != '') moduleF.getPhotoPost(id).description = descr;
        if (link != '') moduleF.getPhotoPost(id).photoLink = link;
        if (htags != '') htags = htags.match(/\#[a-z0-9_]{1,20}/g);
        else if (htags === null) moduleF.getPhotoPost(id).tags = [];

        localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));

        setHTML.setTapeBlock();
        module.setTape();
        module.getPhotoPosts(0, 2);
    }

    function handlerAdd(){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });

        let htags = document.getElementById('tags').value;
        let descr = document.getElementById('descriptions').value;
        let link = document.getElementById('image-url1').value;
        let post = {};
        post.id = '10';
        post.description = descr;
        post.createdAt = new Date();
        post.author = module.user;
        post.photoLink = link;
        post.likes = [];
        let regex1 = /\#[a-z0-9_]{1,20}/g;
        post.tags = htags.match(regex1);
        if (post.tags === null) post.tags = [];
        if (moduleF.validatePhotoPost(post) && typeof(moduleF.getPhotoPost(post.id)) === 'undefined'){
            setHTML.setTapeBlock();
            module.addPhotoPost(post);
            module.setTape();
            module.getPhotoPosts(1, 1);
            localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));
        } else {
            alert("Check the correctness of the entered data.");
        }
    }


    return{
        handlerButtonEnter,
        handlerSearch,
        handlerLike,
        handlerDelete,
        handlerEdit,
        handlerSave,
        handlerAdd
    }
})();
