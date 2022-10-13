const DEBUG = true;

const CONFIG = {
    URL: DEBUG ? 'http://localhost:9000/api/v1' : 'https://orios-server.lavenes.com/api/v1',
    CDN: DEBUG ? 'http://localhost:9000' : 'https://orios-server.lavenes.com',
    HEADERS: {
        "Content-Type": "application/json"
    }
}

export default CONFIG;