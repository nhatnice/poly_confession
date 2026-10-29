import './utils';

//*Users
import Users from './Users';

//*Content
import Categories from './Contents/Categories';
import Articles from './Contents/Articles';
import Comments from './Contents/Comments';
import Files from './Contents/Files';
import Movies from './Contents/Movies';

const Orios = {
  Users,
  Categories,
  Articles,
  Files,
  Movies,
  Comments,
};

export const initializeApp = (appConfig) => {
  const { apiKey, app } = appConfig;

  localStorage.setItem(
    '@ors_api',
    JSON.stringify({
      app,
    }),
  );
};

export default Orios;
