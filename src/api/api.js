export const onError = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error("Произошла ошибка"));
};

const BASE_URL = "http://api.football-data.org/v2/";
const headers = {
    "X-Auth-Token": process.env.REACT_APP_API_TOKEN,
};

export const getCompetitions = () => {
    return fetch(`${BASE_URL}competitions`, {
        headers,
        // credentials: "include",
    }).then(onError);
};
