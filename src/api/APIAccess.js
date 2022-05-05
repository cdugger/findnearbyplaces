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
    register: (name, email, password) => {
        return fetch(`${serverAddress}/register`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
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
                return data.result;
            })
    }

};

export default apiAccess;