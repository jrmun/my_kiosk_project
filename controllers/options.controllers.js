import OptionService from '../services/options.services';

class OptionController {
    optionService = new OptionService();

    createOption = async (req, res) => {
        try {
            const { extra_price, shot_price, ice } = req.body;
            const { status, message, result } = await this.optionService.createOption({ extra_price, shot_price, ice });

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    updateOption = async (req, res) => {
        try {
            const { extra_price, shot_price, ice } = req.body;
            const { option_id } = req.params;
            const { status, message, result } = await this.optionService.updateOption(extra_price, shot_price, ice, option_id);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    deleteOption = async (req, res) => {
        try {
            const { option_id } = req.params;
            const { status, message, result } = await this.optionService.deleteOption(option_id);

            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}

module.exports = OptionController;
