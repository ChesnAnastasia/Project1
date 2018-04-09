function postRequest(path, data) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', path, false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
    else {
        alert('Error ' + xhr.status + ': ' + xhr.statusText);
    }
};
function getRequest(path) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();
    if (xhr.readyState == 4 && xhr.status == 200) {
        let posts = JSON.parse(xhr.responseText, (key, value) => {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        return posts;
    }
    else {
        alert('Error ' + xhr.status + ': ' + xhr.statusText);
    }
};