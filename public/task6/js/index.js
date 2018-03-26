//localStorage.clear();
if (!localStorage.getItem('arrOfPosts')){
    let photoPosts = [
        {
            id: '1',
            description: 'Austria, Wien',
            createdAt: new Date(2017, 03, 13, 16, 51),
            author: 'Mary',
            photoLink: '5.jpg',
            likes: [],
            tags: ['#travel']
        },
        {
            id: '2',
            description: 'Russia, Sankt-Peterburg',
            createdAt: new Date(2017, 06, 07, 12, 49),
            author: 'ChesnAnastasia',
            photoLink: '4.jpg',
            likes: [],
            tags: ['#travel', '#beauty']
        }, 
        {
            id: '3',
            description: 'Hungary, Pech',
            createdAt: new Date(2017, 09, 26, 16, 05),
            author: 'Mary',
            photoLink: '3.jpg',
            likes: [],
            tags: ['#travel', '#beauty', '#happiness']
        },
        {
            id: '4',
            description: 'Hungary, Pech',
            createdAt: new Date(2017, 09, 26, 18, 24),
            author: 'ChesnAnastasia',
            photoLink: '2.jpg',
            likes: [],
            tags: ['#happiness', '#travel']
        },
        {
            id: '5',
            description: 'Hungary, Pech',
            createdAt: new Date(2017, 09, 26, 16, 52),
            author: 'Kate',
            photoLink: '1.jpg',
            likes: [],
            tags: ['#happiness', '#beauty']
        }
    ];
    localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));
    localStorage.setItem('currentId', 6);
}
if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', 'undefind');
var photoPosts = [];/*JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
    if (key == 'createdAt') return new Date(value);
    return value;
});
console.log(photoPosts);*/

window.moduleF = (function () {

    photoPosts.sort(compareByDate);
    function compareByDate(photoPostA, photoPostB) {
        return Date.parse(photoPostB.createdAt) - Date.parse(photoPostA.createdAt);
    }

    let getPhotoPost = function (id) {
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
        let id = localStorage.getItem('currentId');
        photoPost.id = '' + id;
        id++;
        localStorage.setItem('currentId', id);
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        if (validatePhotoPost(photoPost) && typeof(this.getPhotoPost(photoPost.id)) === 'undefined') {
            photoPosts.push(photoPost);
            photoPosts.sort(compareByDate);
            localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));
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
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        photoPosts.sort(compareByDate);
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
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let editPost = this.getPhotoPost(id);
        if (typeof (editPost) !== 'undefined' && validateForEditPost(photoPost)) {
            if (photoPost.description)
                editPost.description = photoPost.description;
            if (photoPost.tags)
                editPost.tags = photoPost.tags;
            if (photoPost.photoLink)
                editPost.photoLink = photoPost.photoLink;
            photoPosts[photoPosts.findIndex((item) => { return item.id == id })] = editPost;
            localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));
            return true;
        }
        else return false;
    }

    let removePhotoPost = function (id) {
        photoPosts = JSON.parse(localStorage.getItem('arrOfPosts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let index = photoPosts.findIndex((item) => { return item.id == id });
        if (index !== -1) {
            photoPosts.splice(index, 1);
            localStorage.setItem('arrOfPosts', JSON.stringify(photoPosts));
            return true;
        }
        else return false;
    }

    return {
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost
    }

})();
