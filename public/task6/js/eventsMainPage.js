window.eventsMainPage = (function () {

    function handlerLogoMP() {
        setHTML.setMainPage();
        module.changeUser(module.user);
    }

    function handlerAddNewPost() {
        setHTML.setAddNewPostPage(new Date());
    }

    function handlerLogOut() {
        setHTML.setMainPage();
        module.changeUser();
    }

    function handlerLogIn() {
        setHTML.setLogInPage();
    }

    function handlerShowMore(btn) {
        photoPosts = module.getAllPosts();
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