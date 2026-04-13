const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class CategoryService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', error => console.error(error));
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    return category
  }

  async update(id, changes) {
    const dataUpdate = [];
    const setQuery = [];

    Object.entries(changes).forEach((entries, index) => {
      setQuery.push(entries[0] + ` = $${index + 1}`);
      dataUpdate.push(entries[1]);
    })

    const query = `UPDATE CATEGORIES SET ${setQuery.join(", ")} WHERE ID = $${dataUpdate.length + 1}`;
    await this.pool.query(query, [...dataUpdate, id])

    return {
      id,
      ...changes
    }
  }

  async delete(id) {
    const query = 'DELETE FROM CATEGORIES WHERE ID = $1'
    await this.pool.query(query, [id])
    return { id };
  }

}

module.exports = CategoryService;
