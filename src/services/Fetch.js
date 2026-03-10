const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchAPI(endpoint, method = 'GET') {
    const headers = {
        "Accept": "application/json",
        "X-API-Key": API_KEY
    };

    if (method === 'POST' || method === 'PUT') {
        headers["Content-Type"] = "application/json";
    }

    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: method,
            headers: headers
        });

        return await res.json();
    } catch (e) {
        return {
            items: [
                {
                    "error": "Something went wrong! Please try again later!",
                    "stack": e.stack
                }
            ]
        };
    }
}