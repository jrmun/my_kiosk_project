const { Option } = require('../models');
const option = require('../models/option');

class OptionRepository {
    optionFindOne = async ({ option_id }) => {
        return await Option.findOne({ where: option_id });
    };

    createOption = async ({ extra_price, shot_price, ice }) => {
        return await Option.create({ extra_price, shot_price, ice });
    };

    updateOption = async (extra_price, shot_price, ice, option_id) => {
        console.log(option_id);
        return await Option.update({ extra_price, shot_price, ice }, { where: { option_id: option_id } });
    };

    deleteOption = async (option_id) => {
        return await Option.destroy({ where: { option_id } });
    };
}

module.exports = OptionRepository;
