import Orios from '@orios';

const ConfessionCategory = '6346d056d3759c7e35a54e4f';

class Confessions {
  static async add(content, banner, moreData = {}) {
    return await Orios.Articles.add(
      content,
      content,
      banner,
      content,
      [],
      ConfessionCategory,
      'public',
      '',
      moreData,
    );
  }

  static async getAll() {
    let confessions = [];

    confessions = await Orios.Categories.getAllItems('article', ConfessionCategory);

    return confessions.items;
  }

  static async get(confessId) {
    let confession = await Orios.Articles.get(confessId);

    return confession;
  }

  static search = async (keywords, limit) =>
    await Orios.Articles.search(keywords, limit, ConfessionCategory);
}

export default Confessions;
