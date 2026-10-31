const DEBUG = process.env.NODE_ENV === 'development';

const CONFIG = {
  URL:
    process.env.REACT_APP_ORIOS_URL ||
    (DEBUG ? 'http://localhost:9000/api/v1' : 'https://orios-server.lavenes.com/api/v1'),
  CDN:
    process.env.REACT_APP_ORIOS_CDN ||
    (DEBUG ? 'http://localhost:9000' : 'https://orios-server.lavenes.com'),
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export default CONFIG;
