import Axios from '../../Axios';

class Comments {
  static add = async (content, contentEditState = [], media, post, moreData = {}) => {
    return Axios.post(`/comments`, {
      content,
      contentEditState,
      media,
      post,
      moreData,
    });
  };

  static update = async (id, title, description, banner, content, category, status, keywords) => {
    return Axios.put(`/comments/${id}`, {
      title,
      description,
      banner,
      content,
      category,
      status,
      slug: title.toSlug(),
      keywords,
    });
  };

  static get = async (artileId) => Axios.get(`/comments/${artileId}`);

  static getPost = async (postId, limit = 0) => Axios.get(`/comments/${postId}/limit/${limit}`);

  static getAll = async (limit) => Axios.get(`/comments${limit ? '/limit/' + limit : ''}`);
}

export default Comments;
