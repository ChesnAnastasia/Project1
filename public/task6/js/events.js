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

    function handlerEnter(){
        if (event.keyCode == 13){
            handlerSearch();
        }
    }
    function handlerSearch(){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });

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

        if (!(authorName == '' && date == '' && htags == '')){
            setHTML.setTapeBlockForFilter();
            module.setTape();
            module.getPhotoPosts(0, photoPosts.length, filter);
        }
        
    }

    function handlerLike(obj){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let child1, child2;
        let table;
        console.log(module.user);
        if (module.user !== null){
            let parent = obj.parentNode;
            parent = parent.parentNode;
            child = parent.getElementsByClassName('count-likes')[0];
            list = parent.getElementsByClassName('authors-like')[0];
            parent = parent.parentNode;
            parent = parent.parentNode;

            let index = moduleF.getPhotoPost(parent.id).likes.indexOf(module.user);
            if (index !== -1) {
                moduleF.getPhotoPost(parent.id).likes.splice(index, 1);
                child.innerHTML = 'Show ' + moduleF.getPhotoPost(parent.id).likes.length + ' likes';
                obj.innerHTML = 'favorite_border';//style.color = 'rgb(55, 11, 30)';
            } else {
                moduleF.getPhotoPost(parent.id).likes.push(module.user);
                child.innerHTML = 'Show ' + moduleF.getPhotoPost(parent.id).likes.length + ' likes';
                obj.innerHTML = 'favorite';
                //obj.style.color = 'rgb(160, 28, 85)';
            }
            localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));

            list.innerHTML =  arrayToString(moduleF.getPhotoPost(parent.id).likes);
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
        let link1 = '';
        if (document.getElementById('img-upload2').value) link1 = document.getElementById('img-upload2').files[0].name;
        let link2 = document.getElementById('image-url2').value;

        let parent = obj.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;

        if (descr != '') moduleF.getPhotoPost(id).description = descr;
        if (link1 !== '') moduleF.getPhotoPost(id).photoLink = link1;
        if (link1 === '' && link2 !== '') moduleF.getPhotoPost(id).photoLink = link2;
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
        let link1 = '';
        if (document.getElementById('img-upload1').value) link1 = document.getElementById('img-upload1').files[0].name;
        let link2 = document.getElementById('image-url1').value;

        let post = {};

        let id = localStorage.getItem('currentId');
        post.id = id;
        id = Number(id);
        id++;
        localStorage.setItem('currentId', id);

        post.description = descr;
        post.createdAt = new Date();
        post.author = module.user;
        post.likes = [];
        if (link1 !== '') post.photoLink = link1;
        if (link1 === '' && link2 !== '') post.photoLink = link2;
        let regex1 = /\#[a-z0-9_]{1,20}/g;
        post.tags = htags.match(regex1);
        if (post.tags === null) post.tags = [];

        if (moduleF.validatePhotoPost(post) && typeof(moduleF.getPhotoPost(post.id)) === 'undefined'){
            console.log("valid");
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
        handlerEnter,
        handlerSearch,
        handlerLike,
        handlerDelete,
        handlerEdit,
        handlerSave,
        handlerAdd
    }
})();
