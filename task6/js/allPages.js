
window.setHTML = (function(){
    function setLogInPage(){
        let main = document.querySelector('.Main');
        main.innerHTML = `
        <header>
            <img class="logo" src="logo.png" alt="logo" onclick="eventsMainPage.handlerLogoMP()">
        </header>
        <div class="pictures">
            <img class="img-picture" src="complexPictures.png" alt="photo">
        </div>
        <div class="LogIn-block">
            <div class="log-in-form">
                <h1>Authorization Form</h1>
                <div class="login">
                    <p class="login-password">Login:</p>
                    <input class="input-log-pass" id="login" type="text" minlength="3" maxlength="20" placeholder="Enter your login" />
                </div>
                <div class="password">
                    <p class="login-password">Password:</p>
                    <input class="input-log-pass" id="password" type="text" minlength="6" maxlength="10" placeholder="Enter your password" />
                </div>
                <button class="bEnter" onclick="events.handlerButtonEnter()">Enter</button>
            </div>
        </div>`;
    }

    function setAddNewPostPage(date) {//no_icon.png
        let tapeBlock = document.querySelector('.Tape-block');
        tapeBlock.innerHTML = `
        <link href="css/stylesAddEditPost.css" rel="stylesheet">
        <h1>Add new post</h1>
        <div class="new-post-block">
            <div class="no-image-block">
                <img src="no_icon.png" class="download-image">
                <textarea id="image-url1" type="text" placeholder="Link to photo"></textarea>
                <p class="date-of-creating">` + date.toLocaleString("en", options) + `</p>
            </div>
            <div class="write-info-block">
                <textarea class="tags-comments" id="tags" type="text" rows="10" placeholder="Add tags..." maxlenght = "200"></textarea>
                <textarea class="tags-comments" id="descriptions" type="text" rows="10" placeholder="Add descriptions..." maxlenght = "200"></textarea>
                <button class="bAdd" onclick="events.handlerAdd()">Add</button>
            </div>
        </div>`;
    }
    
    function setEditPostPage(post) {
        let tapeBlock = document.querySelector('.Tape-block');
        tapeBlock.innerHTML = `
        <link href="css/stylesAddEditPost.css" rel="stylesheet">
        <h1>Edit post</h1>
        <div class="new-post-block">
            <div class="no-image-block">
                <img class="edit-image" src="` + post.photoLink + `" />
                <textarea id="image-url2" type="text" placeholder="Link to new photo"></textarea>
                <p class="date-of-creating">` + post.createdAt.toLocaleString("en", options) + `</p>
            </div>
            <div class="write-info-block">
                <textarea class="tags-comments" id="edit-tags" type="text" rows="10" placeholder="` + arrayToString(post.tags) + `" maxlenght = "200"></textarea>
                <textarea class="tags-comments" id="edit-descriptions" type="text" rows="10" placeholder="` + post.description + `" maxlenght = "200"></textarea>
                <button class="bAdd" onclick="events.handlerSave(this)">Save</button>
            </div>
        </div>`;
    }

    function setMainPage(){
        let main = document.querySelector('.Main');
        main.innerHTML = `
        <div class="User">
            
        </div>
        <div class="Tape-block">
            <div class="Tape">

            </div>
            <div class="Filter">
                <p class="search">Search by:</p>
                <input id="author-name" type="text" placeholder="AuthorName">
                <input id="tags" type="text" placeholder="#tags">
                <input id="date" type=date placeholder="DD.MM.YYYY">
                <button class="bSearch" onclick="events.handlerSearch(this)">
                    <i class="search-icon material-icons">search</i>
                </button>
            </div>
            <button class="bshow" onclick="eventsMainPage.handlerShowMore(this)">Show more...</button>
        </div>
        <header>
            <img class="logo" src="logo.png" alt="logo" onclick="eventsMainPage.handlerLogoMP()">
        </header>`;
    }

    function setTapeBlock(){
        let tapeBlock = document.querySelector('.Tape-block');
        tapeBlock.innerHTML = `
        <div class="Filter">
            <p class="search">Search by:</p>
            <input id="author-name" type="text" placeholder="AuthorName">
            <input id="tags" type="text" placeholder="#tags">
            <input id="date" type=date placeholder="DD.MM.YYYY">
            <button class="bSearch" onclick="events.handlerSearch(this)">
                <i class="search-icon material-icons">search</i>
            </button>
        </div>
        <div class="Tape">

        </div>
        <button class="bshow" onclick="eventsMainPage.handlerShowMore(this)">Show more...</button>`;
        
    }

    function setTapeBlockForFilter(){
        let tapeBlock = document.querySelector('.Tape-block');
        tapeBlock.innerHTML = `
        <div class="Filter">
            <p class="search">Search by:</p>
            <input id="author-name" type="text" placeholder="AuthorName">
            <input id="tags" type="text" placeholder="#tags">
            <input id="date" type=date placeholder="DD.MM.YYYY">
            <button class="bSearch" onclick="events.handlerSearch(this)">
                <i class="search-icon material-icons">search</i>
            </button>
        </div>
        <div class="Tape">

        </div>`;
    }
    
    return{
        setLogInPage,
        setAddNewPostPage,
        setEditPostPage,
        setMainPage,
        setTapeBlock,
        setTapeBlockForFilter
    }
})();
