import axios from "axios";

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

// export const getCompetitions = (plan = "TIER_ONE") => {
//     return fetch(`${BASE_URL}competitions?${plan}`, {
//         headers,
//         // credentials: "include",
//     }).then(onError);
// };

export const getCompetitions = async (plan = "TIER_ONE") => {
    try {
        const response = await axios.get(`${BASE_URL}competitions`, {
            headers,
            params: {
                plan,
            },
        });
        return response.data;
    } catch (error) {
        return new Error("Произошла ошибка");
    }
};

export const getCompetition = (competitionId) => {
    return fetch(`${BASE_URL}competitions/${competitionId}`, {
        headers,
        // credentials: "include",
    }).then(onError);
};

export const getSchedule = (competitionId) => {
    return fetch(`${BASE_URL}competitions/${competitionId}/standings`, {
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

export const getMatches = async ({ competitionId, dateFrom, dateTo }) => {
    try {
        const response = await axios.get(`${BASE_URL}competitions/${competitionId}/matches`, {
            headers,
            params: {
                dateFrom,
                dateTo,
            },
        });
        return response.data;
    } catch (error) {
        return new Error("Произошла ошибка");
    }
};

export const getTeamMatches = async ({ teamId, dateFrom, dateTo }) => {
    try {
        const response = await axios.get(`${BASE_URL}teams/${teamId}/matches`, {
            headers,
            params: {
                dateFrom,
                dateTo,
            },
        });
        return response.data;
    } catch (error) {
        return new Error("Произошла ошибка");
    }
};
