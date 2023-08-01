const OptionRepository = require('../repositories/options.repositories');
const { CustomError, ServiceReturn } = require('../customClass');
const { Model } = require('sequelize');

class OptionService {
    optionRepository = new OptionRepository();

    createOption = async ({ extra_price, shot_price, ice }) => {
        if ((!extra_price, !shot_price, !ice)) throw new CustomError('필수 입력 항목이 충족되지 않았습니다.', 403);
        const Option = await this.optionRepository.createOption({ extra_price, shot_price, ice });

        return new ServiceReturn('옵션 등록이 완료되었습니다.', 200, Option);
    };

    updateOption = async (extra_price, shot_price, ice, option_id) => {
        const findOptionId = await this.optionRepository.optionFindOne(option_id);
        if (!findOptionId) throw new CustomError('해당하는 옵션이 없습니다.', 404);
        if ((!extra_price, !shot_price, !ice)) throw new CustomError('필수 입력 항목이 충족되지 않았습니다.', 403);

        await this.optionRepository.updateOption(extra_price, shot_price, ice, option_id);

        return new ServiceReturn('옵션 수정이 완료되었습니다.', 200);
    };

    deleteOption = async (option_id) => {
        const findOptionId = await this.optionRepository.optionFindOne(option_id);
        if (!findOptionId) throw new CustomError('해당하는 옵션이 없습니다.', 404);

        await this.optionRepository.deleteOption(option_id);
        return new ServiceReturn('옵션 삭제가 완료되었습니다.', 200);
    };
}

module.exports = OptionService;
