const BlogModel = require('../model/blog');

class BlogService {
    constructor() {}
    create(data) {
        return BlogModel.create(data).then(result => {
            return {
                id: result.dataValues.id
            }
        });
    }
    update(data, where) {
        return BlogModel.update(data, {
            where
        });
    }
    del(where) {
        return BlogModel.destroy({
            where
        });
    }
    findById(id) {
        return BlogModel.findById(id).then(data => {
            return data ? data.dataValues : null
        });
    }
    findAndCountAll({
        limit = 0,
        offset = 0
    }) {
        limit = parseInt(limit);
        offset = parseInt(offset);
        return BlogModel.findAndCountAll({
            offset,
            limit
        }).then(data => {
            let list = []
            data.rows.forEach(val => {
                list.push(val.dataValues);
            })
            const hasMore = list.length < data.count;
            return {
                hasMore,
                list
            }
        })
    }
}

module.exports = BlogService;