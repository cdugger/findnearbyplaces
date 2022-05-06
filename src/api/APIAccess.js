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

    search: (search_term, radius_filter, latitude, longitude, maximum_results_to_return) => {
        const user_location = latitude + "," + longitude;
        // const search_str = search_term ? search_term : '';
        // const category_str = category_filter ? category_filter : '';
        // const paramStr = `?user_location=${user_location}&search_term=${search_str}&category_filter=${category_str}&maximum_results_to_return=20`
        // console.log(paramStr);
        return fetch(`${serverAddress}/search`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search_term, user_location, radius_filter, maximum_results_to_return })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },

    getReviews: (place_id) => {
        return fetch(`${serverAddress}/reviews/${place_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })

    },

    getCategories: () => {
        return fetch(`${serverAddress}/categories`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },

    addCategory: (name) => {
        return fetch(`${serverAddress}/category`,
            {
                method: 'Post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify({ name })
            })
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

    updatePlace: (place_id, name, latitude, longitude, description, category_id) => {
        return fetch(`${serverAddress}/place`,
            {
                method: 'Put',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify({ place_id, name, latitude, longitude, description, category_id })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },

    addReview: (comment, rating, photo, place_id) => {
        console.log(JSON.stringify({ place_id, comment, rating }))
        return fetch(`${serverAddress}/review`,
            {
                method: 'Post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify({ place_id, comment, rating })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },

    addPlace: (name, latitude, longitude, category_id, description) => {
        return fetch(`${serverAddress}/place`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ name, latitude, longitude, category_id, description })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },

    deletePlace: (place_id) => {
        return fetch(`${serverAddress}/place/${place_id}`, {
            method: 'Delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ place_id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },

    addPhotoToPlace: (photo, place_id) => {
        return fetch(`${serverAddress}/photo`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ photo, place_id })
        })
    },

    addPhotoToReview: (photo, review_id) => {
        return fetch(`${serverAddress}/photo`, {
            method: 'Post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ photo, review_id })
        })
    }

};

export default apiAccess;