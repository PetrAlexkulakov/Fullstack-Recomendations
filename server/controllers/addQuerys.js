const { Op } = require('sequelize');

module.exports.addQuery = async function(whereCondition, req) {
    const { group, tags, search } = req.query;

    if (group) {
        whereCondition.group = group;
    }

    if (tags) {
        whereCondition['$Tags.name$'] = {
            [Op.in]: tags.split(';').map(tag => tag.trim())
        };
    }

    if (search) {
        const searchLower = search.toLowerCase();
        whereCondition[Op.or] = [
            { title: { [Op.like]: `%${searchLower}%` } },
            { smallText: { [Op.like]: `%${searchLower}%` } },
            { fullText: { [Op.like]: `%${searchLower}%` } }
        ];
    }
}