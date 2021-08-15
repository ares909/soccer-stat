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

export const getCompetition = (competitionId) => {
    return fetch(`${BASE_URL}competitions/${competitionId}`, {
        headers,
        // credentials: "include",
    }).then(onError);
};

export const getSchedule = (competitionId) => {
    return fetch(`${BASE_URL}competitions/${competitionId}/matches`, {
        headers,
        // credentials: "include",
    }).then(onError);
};

export const getTeams = (competitionId) => {
    return fetch(`${BASE_URL}competitions/${competitionId}/teams`, {
        headers,
        // credentials: "include",
    }).then(onError);
};
