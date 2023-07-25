const ItemService = require("../services/restaurants.service");

class ItemsController {
  itemService = new ItemService();

  getItem = async (req, res) => {
    try {
      const item_id = req.params;
      const { status, message, result } = await this.itemService({ item_id });

      return res.status(status).json({ message, result });
    } catch (error) {
      if (error.status) return res.status(error.status).json({ message });
      return res
        .status(500)
        .json({ message: "알 수 없는 오류가 발생하였습니다." });
    }
  };

  getItemList = async (req, res) => {
    try {
      const { status, message, result } = await this.itemService();

      return res.status(status).json({ message, result });
    } catch (error) {
      if (error.status) return res.status(error.status).json({ message });
      return res
        .status(500)
        .json({ message: "알 수 없는 오류가 발생하였습니다." });
    }
  };

  createItem = async (req, res) => {
    try {
      const { name, price, type, option_id } = req.body;
    } catch {}
  };
}
