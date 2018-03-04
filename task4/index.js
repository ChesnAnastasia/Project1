var photoPosts = [
    {
        id: '1',
        description: 'Czech Republic',
        createdAt: new Date(2014, 10, 21, 30, 15),
        author: 'ChesnAnastasia',
        photoLink: '1.jpg',
        tags: ['#beauty', '#travels', '#hobby'],
        likes: ['Masha', 'Kate']
    },
    {
        id: '2',
        description: 'Russia',
        createdAt: new Date(2015, 04, 28, 23, 18),
        author: 'Masha',
        photoLink: '2.jpg',
        tags: ['#beauty', '#lovenature', '#hobby'],
        likes: ['ChesnAnastasia', 'Kate', 'Dasha']
    },
    {
        id: '3',
        description: 'Czech Republic',
        createdAt: new Date(2016, 12, 21, 23, 14),
        author: 'Dasha',
        photoLink: '3.jpg',
        tags: ['#beauty', '#lovenature'],
        likes: ['Masha', 'Kate']
    },
    {
        id: '4',
        description: 'Hungary',
        createdAt: new Date(2015, 04, 28, 23, 18),
        author: 'Masha',
        photoLink: '4.jpg',
        tags: ['#pleasure', '#travels', '#hobby'],
        likes: ['ChesnAnastasia', 'Kate']
    },
    {
        id: '5',
        description: 'Hungary',
        createdAt: new Date(2016, 12, 21, 23, 14),
        author: 'ChesnAnastasia',
        photoLink: '5.jpg',
        tags: ['#beauty', '#pleasure'],
        likes: ['Dasha', 'Kate', 'Masha']
    },
    {
        id: '6',
        description: 'rest',
        createdAt: new Date(2014, 10, 21, 30, 15),
        author: 'ChesnAnastasia',
        photoLink: '1.jpg',
        tags: ['#beauty', '#hobby'],
        likes: ['Masha', 'Kate']
    },
    {
        id: '7',
        description: 'Russia',
        createdAt: new Date(2015, 04, 28, 23, 18),
        author: 'Masha',
        photoLink: '2.jpg',
        tags: ['#beauty', '#lovenature', '#hobby'],
        likes: ['ChesnAnastasia', 'Kate', 'Dasha']
    },
    {
        id: '8',
        description: 'Czech Republic',
        createdAt: new Date(2015, 12, 21, 23, 14),
        author: 'Dasha',
        photoLink: '3.jpg',
        tags: ['#beauty', '#lovenature'],
        likes: ['Masha', 'Kate']
    },
    {
        id: '9',
        description: 'Hungary',
        createdAt: new Date(2015, 04, 15, 23, 18),
        author: 'Kate',
        photoLink: '4.jpg',
        tags: ['#pleasure', '#travels', '#hobby'],
        likes: ['ChesnAnastasia', 'Kate']
    },
    {
        id: '10',
        description: 'Hungary',
        createdAt: new Date(2016, 12, 21, 23, 14),
        author: 'ChesnAnastasia',
        photoLink: '5.jpg',
        tags: ['#beauty', '#pleasure'],
        likes: ['Dasha', 'Kate', 'Masha']
    }
];

var post1 = {
    id: '11',
    description: 'hello world',
    createdAt: new Date(2018, 02, 24, 18, 45),
    author: 'Kate',
    photoLink: 'photo link',
    tags: ['#beauty', '#health'],
    likes: ['Masha']
};

var editPost2 = {
    id: '46',
    description: 'changed',
    createdAt: new Date(2018, 02, 24, 18, 45),
    author: 'Kate',
    photoLink: 'photo link1',
    tags: ['#beauty', '#health'],
    likes: ['Masha']
};

var forValid1 = {
    id: '46',
    description: 308,
    createdAt: new Date(2018, 02, 24, 18, 45),
    author: 'Kate',
    photoLink: [3, 4],
    tags: ['#beauty', '#health'],
    likes: ['Masha']
};
var forValid2 = {
    id: '46',
    description: 'dfghj',
    createdAt: new Date(2018, 02, 24, 18, 45),
    author: 'Kate',
    photoLink: [3, 4],
    tags: ['#beauty', '#health'],
    likes: ['Masha']
};

var filter1 = {
    author: 'Masha'
}
var filter2 = {
    author: 'ChesnAnastasia',
    createdAt: new Date(2014, 10, 21, 30, 15)
}
var filter3 = {
    author: 'ChesnAnastasia',
    createdAt: new Date(2014, 10, 21, 30, 15),
    tags: ['#travels']
}

let module = (function () {

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

    let validatePhotoPost = function (photoPost){
        if (photoPost.id && typeof(photoPost.id) === 'string' 
            && photoPost.description && typeof(photoPost.description) === 'string' && photoPost.description.length <= 300
            && photoPost.createdAt && photoPost.createdAt instanceof Date
            && photoPost.author && typeof(photoPost.author) === 'string' && photoPost.author !== ''
            && photoPost.photoLink && typeof(photoPost.photoLink) === 'string'  && photoPost.photoLink !== ''
            && (typeof(photoPost.tags) === 'undefined' || (validArr(photoPost.tags) && photoPost.tags.length <= 30))
            && (typeof(photoPost.likes) === 'undefined' || validArr(photoPost.likes))) return true;
        else return false;
    }

    let addPhotoPost = function (photoPost) {
        if (validatePhotoPost(photoPost)){
            photoPosts.push(photoPost);
            photoPosts.sort(compareByDate);
            return true;
        }
        return false;
    }

    function validateFilter(filterConfig){
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
        if (typeof(editPost) !== 'undefined' && validateForEditPost(photoPost)){
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

console.log(photoPosts);

console.log("editPhotoPost('6', { description: 'a' })");
console.log(module.editPhotoPost('6', { description: 'a' }));

console.log(module.getPhotoPost('3'));
console.log("getPhotoPost(3)");
console.log(module.getPhotoPost(3));

console.log("addPhotoPost(forValid1)");
console.log(module.addPhotoPost(forValid1));
console.log("addPhotoPost(forValid2)");
console.log(module.addPhotoPost(forValid2));
console.log("addPhotoPost(post1)");
console.log(module.addPhotoPost(post1));
console.log(photoPosts);

console.log("editPhotoPost('51', { description: 'a' })");
console.log(module.editPhotoPost('51', { description: 'a' }));
console.log("editPhotoPost('6', { description: 'a' })");
console.log(module.editPhotoPost('6', { description: 'a' }));
console.log("editPhotoPost('6', forValid1)");
console.log(module.editPhotoPost('6', forValid1));
console.log("editPhotoPost('6', forValid2)");
console.log(module.editPhotoPost('6', forValid2));
console.log("editPhotoPost('6', editPost2)");
console.log(module.editPhotoPost('6', editPost2));
console.log(photoPosts);

console.log("removePhotoPost(4)");
console.log(module.removePhotoPost(4));
console.log("removePhotoPost([4, 3])");
console.log(module.removePhotoPost([4, 3]));
console.log("removePhotoPost('4')");
console.log(module.removePhotoPost('4'));
console.log(photoPosts);

console.log("getPhotoPosts(0, 5)");
console.log(module.getPhotoPosts(0, 5));
console.log("getPhotoPosts(0, 5, filter1)");
console.log(module.getPhotoPosts(0, 5, filter1));
console.log("getPhotoPosts(0, 5, filter2)");
console.log(module.getPhotoPosts(0, 5, filter2));
console.log("getPhotoPosts(0, 5, filter3)");
console.log(module.getPhotoPosts(0, 5, filter3));