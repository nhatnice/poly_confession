import Axios from '../../Axios';

class Categories {
  static add = async (title, slug, status, type, description, banner, category) => {
    return Axios.post(`/categories`, {
      title,
      slug,
      status,
      type,
      description,
      banner,
      category,
      atHome: category ? false : false,
    });
  };

  static getAll = async (limit) => Axios.get(`/categories${limit ? '/limit/' + limit : ''}`);
  static getByType = async (type) => Axios.get(`/categories/type/${type}`);
  static getAllItems = async (type, category) => Axios.get(`/categories/${type}/${category}/items`);
}

export default Categories;
