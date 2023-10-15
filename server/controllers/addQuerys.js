const { Op } = require('sequelize');

module.exports.addQuery = async function(whereCondition, req) {
    const { group, tags, search } = req.query;

    if (group) {
        whereCondition.group = {
            [Op.like]: `%${group}%`
        };
    }

    if (tags) {
        whereCondition['$Tags.name$'] = {
            [Op.in]: tags.split(';').map(tag => tag.trim())
        };
    }

    if (search) {
        const searchLower = search.toLowerCase();
        const searchArray = searchLower.split(' ');
        const orConditions = [];

        orConditions.push(
            { title: { [Op.like]: `%${searchLower}%` } },
            { smallText: { [Op.like]: `%${searchLower}%` } },
            { fullText: { [Op.like]: `%${searchLower}%` } },
            { '$comments.text$': { [Op.like]: `%${searchLower}%` } }
        );

        searchArray.forEach(element => {
            orConditions.push(
                { '$Tags.name$': { [Op.like]: `%${element}%` } },
                { group: { [Op.like]: `%${element}%` } }
            );
        });

        whereCondition[Op.or] = orConditions;
    }
}
