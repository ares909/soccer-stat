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

export const getCompetition = async (competitionId) => {
    try {
        const response = await axios.get(`${BASE_URL}competitions/${competitionId}`, {
            headers,
        });
        return response.data;
    } catch (error) {
        return new Error("Произошла ошибка");
    }
};

export const getSchedule = async (competitionId) => {
    try {
        const response = await axios.get(`${BASE_URL}competitions/${competitionId}/standings`, {
            headers,
        });
        return response.data;
    } catch (error) {
        return new Error("Произошла ошибка");
    }
};

export const getTeams = async (competitionId) => {
    try {
        const response = await axios.get(`${BASE_URL}competitions/${competitionId}/teams`, {
            headers,
        });
        return response.data;
    } catch (error) {
        return new Error("Произошла ошибка");
    }
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

export const getTeamMatches = async ({ teamId, dateFrom, dateTo, limit }) => {
    try {
        const response = await axios.get(`${BASE_URL}teams/${teamId}/matches`, {
            headers,
            params: {
                dateFrom,
                dateTo,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        return new Error("Произошла ошибка");
    }
};
