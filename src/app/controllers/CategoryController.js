const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoryRepository.findAll();
    res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.create({ name });

    res.json(category);
  }
}

module.exports = new CategoryController();
