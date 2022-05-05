const serverAddress = 'http://localhost:8000';

const apiAccess = {
    logout: () => {
        return fetch(`${serverAddress}/logout`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },
    login: (email, password) => {
        return fetch(`${serverAddress}/login`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            });
    },
    register: (email, password) => {
        return fetch(`${serverAddress}/customer`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            });
    },

    getCategories: () => {
        return fetch(`${serverAddress}/categories`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },

    getPlace: (place_id) => {
        return fetch(`${serverAddress}/place/${place_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data.result;
            })
    },

    addPlace: (name, latitude, longitude, category_id, description) => {
        return fetch(`${serverAddress}/place`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, latitude, longitude, category_id, description })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data
            })
    },

    addPhotoToPlace: (photo, place_id) => {
        return fetch(`${serverAddress}/photo`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ photo, place_id })
        })
    }

};

export default apiAccess;