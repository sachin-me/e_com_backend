const User = require("../models/User");

module.exports = {
  getSellersList: async (req, res) => {
    try {
      const sellers = await User.find({ role: "seller" });
      if (sellers.length == 0) {
        return res.status(404).json({
          message: "Seems like there're no sellers available.",
          data: [],
        });
      } else {
        return res.status(200).json({
          message: "Sellers found successfully",
          data: sellers,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }
  },
};
