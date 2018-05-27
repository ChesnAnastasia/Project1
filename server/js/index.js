const postsPath = './server/data/photoPosts.json';
const idPath = './server/data/currentId.json';
const fs = require('fs');

let photoPosts = [];


const serverModule = {

    compareByDate(photoPostA, photoPostB) {
        return Date.parse(photoPostB.createdAt) - Date.parse(photoPostA.createdAt);
    },

    getPhotoPost(id) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        return photoPosts.find(element => element.id === id);
    },

    getCountOfPosts() {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        return photoPosts.length;
    },

    validArr(arr) {
        if (Array.isArray(arr)) {
            return arr.every(element => typeof (element) === 'string');
        }
        return false;
    },
    validatePhotoPost(photoPost) {
        if (photoPost.id && typeof (photoPost.id) === 'string'
            && photoPost.description && typeof (photoPost.description) === 'string' && photoPost.description.length <= 200
            && photoPost.createdAt && photoPost.createdAt instanceof Date
            && photoPost.author && typeof (photoPost.author) === 'string' && photoPost.author !== ''
            && photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink !== ''
            && (typeof (photoPost.tags) === 'undefined' || this.validArr(photoPost.tags))
            && (typeof (photoPost.likes) === 'undefined' || this.validArr(photoPost.likes))) return true;
        return false;
    },

    addPhotoPost(photoPost) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        let id = JSON.parse(fs.readFileSync(idPath));
        console.log(id);
        const post = photoPost;
        post.id = `${id}`;
        id += 1;
        fs.writeFileSync(idPath, id);
        if (this.validatePhotoPost(post) && typeof (this.getPhotoPost(post.id)) === 'undefined') {
            photoPosts.push(post);
            photoPosts.sort(this.compareByDate);
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        return false;
    },

    validateFilter(filterConfig) {
        if ((!filterConfig.author || (filterConfig.author && typeof (filterConfig.author) === 'string' && filterConfig.author !== '')) && (typeof (filterConfig.tags) === 'undefined' || (Array.isArray(filterConfig.tags) && filterConfig.tags.length <= 30)) && (!filterConfig.createdAt || (filterConfig.createdAt && filterConfig.createdAt instanceof Date))) {
            return true;
        }
        return false;
    },
    getPhotoPosts(skip, top, filterConfig) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        photoPosts.sort(this.compareByDate);
        fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
        let posts = photoPosts;
        if (filterConfig && this.validateFilter(filterConfig)) {
            if (filterConfig.author) {
                posts = posts.filter(element => element.author === filterConfig.author);
            }
            if (filterConfig.createdAt) {
                posts = posts.filter(element =>
                    element.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                    element.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                    element.createdAt.getDate() === filterConfig.createdAt.getDate());
            }
            if (filterConfig.tags) {
                posts = posts.filter(post => filterConfig.tags
                    .every(element => post.tags.includes(element)));
            }
        }
        posts = posts.slice(skip, skip + top);
        return posts;
    },

    validateForEditPost(photoPost) {
        if ((!photoPost.id || (photoPost.id && typeof (photoPost.id) === 'string'))
            && (!photoPost.description || (photoPost.description && typeof (photoPost.description) === 'string' && photoPost.description.length <= 300)) && (!photoPost.createdAt || (photoPost.createdAt && photoPost.createdAt instanceof Date))
            && (!photoPost.author || (photoPost.author && typeof (photoPost.author) === 'string' && photoPost.author !== ''))
            && (!photoPost.photoLink || (photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink !== ''))
            && (typeof (photoPost.tags) === 'undefined' || (this.validArr(photoPost.tags) && photoPost.tags.length <= 30))
            && (typeof (photoPost.likes) === 'undefined' || this.validArr(photoPost.likes))) return true;
        return false;
    },
    editPhotoPost(id, photoPost) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });

        const editPost = this.getPhotoPost(id);
        if (typeof (editPost) !== 'undefined' && this.validateForEditPost(photoPost)) {
            if (photoPost.description) {
                editPost.description = photoPost.description;
            }
            if (photoPost.tags) {
                editPost.tags = photoPost.tags;
            }
            if (photoPost.photoLink) {
                editPost.photoLink = photoPost.photoLink;
            }
            if (photoPost.userLike) {
                const user = photoPost.userLike;
                const index = editPost.likes.indexOf(user);
                console.log(`ind: ${index}`);
                if (index !== -1 && editPost.likes !== undefined) {
                    editPost.likes.splice(index, 1);
                    console.log(`splice: ${editPost.likes}`);
                } else editPost.likes.push(user);
                console.log(editPost.likes);
            }
            photoPosts[photoPosts.findIndex(item => item.id === id)] = editPost;
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        return false;
    },

    removePhotoPost(id) {
        photoPosts = JSON.parse(fs.readFileSync(postsPath), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        const index = photoPosts.findIndex(item => item.id === id);
        if (index !== -1) {
            photoPosts.splice(index, 1);
            fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
            return true;
        }
        return false;
    },
};

module.exports = serverModule;
