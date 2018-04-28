const postsPath = './server/data/photoPosts.json';
const idPath = './server/data/currentId.json';
const userPath = './server/data/currentUser.json';
const usersPath = './server/data/users.json';
const fs = require('fs');

var photoPosts = [];


serverModule = (function () {
    
    /*let setUser = function (newUser) {
        if (fs.writeFileSync(userPath, newUser)) return true;
        else return false;
    }
    let getUser = function () {
        let user = fs.readFileSync(userPath);
        return user;
    }

    let getAllUsers = function () {
        return fs.readFileSync(usersPath);
    }*/

    /*let getAllPosts = function () {
        return fs.readFileSync(postsPath);
    }*/

    //photoPosts.sort(compareByDate);
    function compareByDate(photoPostA, photoPostB) {
        return Date.parse(photoPostB.createdAt) - Date.parse(photoPostA.createdAt);
    }

    let getPhotoPost = function (id) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        return photoPosts.find(element => element.id === id);
    }

    function validArr(arr) {
        if (Array.isArray(arr)) {
            return arr.every(function (element) {
                return typeof (element) === 'string';
            });
        }
        return false;
    }
    let validatePhotoPost = function (photoPost) {
        if (photoPost.id && typeof (photoPost.id) === 'string'
            && photoPost.description && typeof (photoPost.description) === 'string' && photoPost.description.length <= 200
            && photoPost.createdAt && photoPost.createdAt instanceof Date
            && photoPost.author && typeof (photoPost.author) === 'string' && photoPost.author !== ''
            && photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink !== ''
            && (typeof (photoPost.tags) === 'undefined' || validArr(photoPost.tags))
            && (typeof (photoPost.likes) === 'undefined' || validArr(photoPost.likes))) return true;
        else return false;
    }

    let addPhotoPost = function (photoPost) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let id = JSON.parse(fs.readFileSync(idPath))
        console.log(id);
        photoPost.id = '' + id;
        id++;
        fs.writeFileSync(idPath, id);
        if (validatePhotoPost(photoPost) && typeof(getPhotoPost(photoPost.id)) === 'undefined') {
            photoPosts.push(photoPost);
            photoPosts.sort(compareByDate);
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        return false;
    }

    function validateFilter(filterConfig) {
        if ((!filterConfig.author || (filterConfig.author && typeof (filterConfig.author) === 'string' && filterConfig.author !== ''))
            && (typeof (filterConfig.tags) === 'undefined' || (Array.isArray(filterConfig.tags) && filterConfig.tags.length <= 30))
            && (!filterConfig.createdAt || (filterConfig.createdAt && filterConfig.createdAt instanceof Date))) return true;
        else return false;
    }
    let getPhotoPosts = function (skip, top, filterConfig) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        photoPosts.sort(compareByDate);
        fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
        let posts = photoPosts;
        if (filterConfig && validateFilter(filterConfig)) {
            if (filterConfig.author) {
                posts = posts.filter(function (element) {
                    return element.author === filterConfig.author;
                });
            }
            if (filterConfig.createdAt) {
                posts = posts.filter(element =>
                    element.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                    element.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                    element.createdAt.getDate() === filterConfig.createdAt.getDate());
            }
            if (filterConfig.tags) {
                posts = posts.filter(function (post) {
                    if (typeof (post.tags) !== 'undefined') {
                        return filterConfig.tags.every(function (element) {
                            return post.tags.includes(element);
                        })
                    }
                })
            }
        }
        posts = posts.slice(skip, skip + top);
        return posts;
    }

    function validateForEditPost(photoPost) {
        if ((!photoPost.id || (photoPost.id && typeof (photoPost.id) === 'string'))
            && (!photoPost.description || (photoPost.description && typeof (photoPost.description) === 'string' && photoPost.description.length <= 300))
            && (!photoPost.createdAt || (photoPost.createdAt && photoPost.createdAt instanceof Date))
            && (!photoPost.author || (photoPost.author && typeof (photoPost.author) === 'string' && photoPost.author !== ''))
            && (!photoPost.photoLink || (photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink !== ''))
            && (typeof (photoPost.tags) === 'undefined' || (validArr(photoPost.tags) && photoPost.tags.length <= 30))
            && (typeof (photoPost.likes) === 'undefined' || validArr(photoPost.likes))) return true;
        else return false;
    }
    let editPhotoPost = function (id, photoPost) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        
        let editPost = getPhotoPost(id);
        if (typeof (editPost) !== 'undefined' && validateForEditPost(photoPost)) {
            if (photoPost.description)
                editPost.description = photoPost.description;
            if (photoPost.tags)
                editPost.tags = photoPost.tags;
            if (photoPost.photoLink)
                editPost.photoLink = photoPost.photoLink;
            if (photoPost.userLike){
                const user = photoPost.userLike;
                const index = editPost.likes.indexOf(user);
                if (index !== -1) editPost.likes.push(user);
                else editPhotoPost.likes.splice(index, 1);
            }
            photoPosts[photoPosts.findIndex((item) => { return item.id == id })] = editPost;
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        else return false;
    }

    let removePhotoPost = function (id) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let index = photoPosts.findIndex((item) => { return item.id == id });
        if (index !== -1) {
            photoPosts.splice(index, 1);
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        else return false;
    }

    return {
        /*setUser,
        getUser,
        getAllUsers,*/
        //getAllPosts,
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost
    }

})();

module.exports = serverModule;