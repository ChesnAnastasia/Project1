window.eventsMainPage = (function(){

    function handlerLogoMP(){
        console.log(localStorage.getItem('currentUser') === 'undefind' ? null : localStorage.getItem('currentUser'));
        setHTML.setMainPage();
        module.changeUser(module.user);
    }

    function handlerAddNewPost(){
        setHTML.setAddNewPostPage(new  Date());
    }

    function handlerLogOut(){
        setHTML.setMainPage();
        module.changeUser();
    }

    function handlerLogIn(){
        setHTML.setLogInPage();
    }

    function handlerShowMore(btn){
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let count = document.getElementsByClassName('post').length;
        if (count + 2 >= photoPosts.length) {
            btn.style.display = 'none';
        }
        module.getPhotoPosts(count, 2);
    }

    return {
        handlerLogoMP,
        handlerAddNewPost,
        handlerLogOut,
        handlerLogIn,
        handlerShowMore
    }
})();