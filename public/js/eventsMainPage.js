window.eventsMainPage = {

    handlerLogoMP() {
        window.setHTML.setMainPage();
        module.changeUser(module.getUser());
    },

    handlerAddNewPost() {
        window.setHTML.setAddNewPostPage(new Date());
    },

    handlerLogOut() {
        window.setHTML.setMainPage();
        module.changeUser();
    },

    handlerLogIn() {
        window.setHTML.setLogInPage();
    },

    handlerShowMore(btn) {
        const button = btn;
        const length = module.getCountOfPosts();
        const count = document.getElementsByClassName('post').length;
        if (count + 2 >= length) {
            button.style.display = 'none';
        }
        module.getPhotoPosts(count, 2);
    },
};
