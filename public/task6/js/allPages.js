
window.setHTML = (function(){
    function setLogInPage(){
        let main = document.querySelector('.Main');
        main.innerHTML = `
        <header>
            <img class="logo" src="/public/task6/logo.png" alt="logo" onclick="eventsMainPage.handlerLogoMP()">
        </header>
        <div class="pictures">
            <img class="img-picture" src="/public/task6/complexPictures.png" alt="photo">
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
        <link href="/public/task6/css/stylesAddEditPost.css" rel="stylesheet">
        <h1>Add new post</h1>
        <div class="new-post-block">
            <div class="no-image-block">
                <img src="/public/task6/no_icon.png" id="download-image" onclick="getFile1()">
                <input type="file" id="img-upload1" onchange="updateImageDisplay1()" accept="image/*" required />
                <textarea id="image-url1" type="text" placeholder="...or link to photo"></textarea>
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
        let link;
        if (post.photoLink.substring(0, 5) === 'http:') link = post.photoLink;
        else link = '/public/task6/' + post.photoLink;
        tapeBlock.innerHTML = `
        <link href="/public/task6/css/stylesAddEditPost.css" rel="stylesheet">
        <h1>Edit post</h1>
        <div class="new-post-block">
            <div class="no-image-block">
                <img id="edit-image" src="` + link + `" onclick="getFile2()">
                <input type="file" id="img-upload2" onchange="updateImageDisplay2()" accept="image/*" required />
                <textarea id="image-url2" type="text" placeholder="...or link to new photo"></textarea>
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
                <input id="author-name" type="text" placeholder="AuthorName" onkeyup = "events.handlerEnter()">
                <input id="tags" type="text" placeholder="#tags" onkeyup = "events.handlerEnter()">
                <input id="date" type=date placeholder="DD.MM.YYYY" onkeyup = "events.handlerEnter()">
                <button class="bSearch" onclick="events.handlerSearch()">
                    <i class="search-icon material-icons">search</i>
                </button>
            </div>
            <button class="bshow" onclick="eventsMainPage.handlerShowMore(this)">Show more...</button>
        </div>
        <header>
            <img class="logo" src="/public/task6/logo.png" alt="logo" onclick="eventsMainPage.handlerLogoMP()">
        </header>`;
    }

    function setTapeBlock(){
        let tapeBlock = document.querySelector('.Tape-block');
        tapeBlock.innerHTML = `
        <div class="Filter">
            <p class="search">Search by:</p>
            <input id="author-name" type="text" placeholder="AuthorName" onkeyup = "events.handlerEnter()">
            <input id="tags" type="text" placeholder="#tags" onkeyup = "events.handlerEnter()">
            <input id="date" type=date placeholder="DD.MM.YYYY" onkeyup = "events.handlerEnter()">
            <button class="bSearch" onclick="events.handlerSearch()">
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
            <input id="author-name" type="text" placeholder="AuthorName" onkeyup = "events.handlerEnter()">
            <input id="tags" type="text" placeholder="#tags" onkeyup = "events.handlerEnter()">
            <input id="date" type=date placeholder="DD.MM.YYYY" onkeyup = "events.handlerEnter()">
            <button class="bSearch" onclick="events.handlerSearch()">
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


function getFile1() {
    document.getElementById("img-upload1").click();
    console.log('+');
}
function getFile2() {
    document.getElementById("img-upload2").click();
    console.log('+');
}
function updateImageDisplay1() {
    const curFiles = document.getElementById("img-upload1").files;
    if (curFiles.length !== 0) {
        document.querySelector('#download-image').src = '/public/task6/' + document.getElementById('img-upload1').files[0].name;
    }
}
function updateImageDisplay2() {
    const curFiles = document.getElementById("img-upload2").files;
    if (curFiles.length !== 0) {
        document.querySelector('#edit-image').src = '/public/task6/' + document.getElementById('img-upload2').files[0].name;
    }
}