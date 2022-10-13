import Axios from '../../Axios';

class Movies {
    static add = async (title, description, banner, category, status, keywords, tags, moreData, media, imdb, timeLength, trailers, directors, actors, country, releaseDate) => {
        return Axios.post(`/movies`, {
            title,
            description,
            banner,
            category,
            status,
            slug: title.toSlug(),
            keywords,
            tags, 
            moreData, 
            media, 
            imdb, 
            timeLength, 
            trailers, 
            directors, 
            actors, 
            country, 
            releaseDate
        });
    };

    static update = async (id, title, description, banner, category, status, keywords, tags, moreData, media, imdb, timeLength, trailers, directors, actors, country, releaseDate) => {
        return Axios.put(`/movies/${id}`, {
            title,
            description,
            banner,
            category,
            status,
            slug: title.toSlug(),
            keywords,
            tags, 
            moreData, 
            media, 
            imdb, 
            timeLength, 
            trailers, 
            directors, 
            actors, 
            country, 
            releaseDate
        });
    };

    static get = async movieId => Axios.get(`/movies/${movieId}`);
}

export default Movies;