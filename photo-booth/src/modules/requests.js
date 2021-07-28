export const postImage = async (url = '', data = {}) => {
    const formData = new FormData();
    formData.append('file', data);
    console.log('posting image');
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {},
        body: formData, // body data type must match "Content-Type" header
    });
    const res = await response.json();
    if (response.ok) {
        return res;
    } else {
        console.error('ERROR: Failed to save image', res)
    }
};

export const fetchImagePreview = async () => {
    const response = await fetch('/preview', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {},
    });
    console.log(response)
    return response.json();
}

