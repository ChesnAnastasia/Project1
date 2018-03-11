var photoPosts = [];

let moduleF = (function () {

    photoPosts.sort(compareByDate);
    function compareByDate(photoPostA, photoPostB) {
        return Date.parse(photoPostB.createdAt) - Date.parse(photoPostA.createdAt);
    }

    let getPhotoPost = function (id) {
        return photoPosts.find(item => item.id === id);
    }

    function validArr(arr) {
        if (Array.isArray(arr)) {
            return arr.every(function (item) {
                return typeof (item) === 'string';
            });
        }
        return false;
    }
    let validatePhotoPost = function (photoPost) {
        if (photoPost.id && typeof (photoPost.id) === 'string'
            && photoPost.description && typeof (photoPost.description) === 'string' && photoPost.description.length <= 300
            && photoPost.createdAt && photoPost.createdAt instanceof Date
            && photoPost.author && typeof (photoPost.author) === 'string' && photoPost.author !== ''
            && photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink !== ''
            && (typeof (photoPost.tags) === 'undefined' || (validArr(photoPost.tags) && photoPost.tags.length <= 30))
            && (typeof (photoPost.likes) === 'undefined' || validArr(photoPost.likes))) return true;
        else return false;
    }

    let addPhotoPost = function (photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            photoPosts.sort(compareByDate);
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
        let posts = photoPosts;
        if (filterConfig && validateFilter(filterConfig)) {
            if (filterConfig.author) {
                posts = posts.filter(function (item) {
                    return item.author === filterConfig.author;
                });
            }
            if (filterConfig.createdAt) {
                posts = posts.filter(function (item) {
                    return Date.parse(item.createdAt) === Date.parse(filterConfig.createdAt);
                });
            }
            if (filterConfig.tags) {
                posts = posts.filter(function (post) {
                    if (typeof (post.tags) !== 'undefined') {
                        return filterConfig.tags.every(function (item) {
                            return post.tags.includes(item);
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
        let editPost = this.getPhotoPost(id);
        if (typeof (editPost) !== 'undefined' && validateForEditPost(photoPost)) {
            if (photoPost.description)
                editPost.description = photoPost.description;
            if (photoPost.tags)
                editPost.tags = photoPost.tags;
            if (photoPost.photoLink)
                editPost.photoLink = photoPost.photoLink;
            photoPosts[photoPosts.findIndex((item) => { return item.id == id })] = editPost;
            return true;
        }
        else return false;
    }

    let removePhotoPost = function (id) {
        let index = photoPosts.findIndex((item) => { return item.id == id });
        if (index !== -1) {
            photoPosts.splice(index, 1);
            return true;
        }
        else return false;
    }

    return {
        getPhotoPosts,
        getPhotoPost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost
    }

})();