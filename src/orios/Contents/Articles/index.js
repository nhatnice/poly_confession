import Axios from '../../Axios';

class Articles {
    static add = async (title, description, banner, content, contentEditState=[], category, status, keywords, moreData={}) => {
        return Axios.post(`/posts`, {
            title,
            description,
            banner,
            content,
            contentEditState: contentEditState.length ? contentEditState : [{
                type: 'paragraph',
                children: [{ text: content }],
              }],
            category,
            status,
            slug: title.toSlug(),
            keywords,
            moreData
        });
    };

    static update = async (id, title, description, banner, content, category, status, keywords) => {
        return Axios.put(`/posts/${id}`, {
            title,
            description,
            banner,
            content,
            category,
            status,
            slug: title.toSlug(),
            keywords
        });
    };

    static get = async artileId => Axios.get(`/posts/${artileId}`);

    static getSlug = async slug => Axios.get(`/posts/slug/${slug}`);

    static getAll = async limit => Axios.get(`/posts${limit ? "/limit/" + limit : ""}`);

    static getAllRandom = async limit => Axios.get(`/posts/random${limit ? "/" + limit : ""}`);

    static search = async (keywords, limit, category) => Axios.post(`/posts/search`, {
        limit,
        keywords,
        category
    });
}

export default Articles;