const Catalog = require("../models/Catalog");
const Product = require("../models/Product");
const User = require("../models/User");

module.exports = {
  getSellersList: async (req, res) => {
    try {
      const sellers = await User.find({ role: "seller" }).select("-password");
      if (sellers.length == 0) {
        return res.status(404).json({
          error: "Seems like there're no sellers available.",
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
  getSellerCatalog: async (req, res) => {
    const { seller_id } = req.params;
    try {
      const catalog = await Catalog.findOne({ created_by: seller_id })
        .populate("created_by")
        .select("name");
      if (!catalog) {
        return res.status(404).json({
          error: "Seems like there're no catalogs available.",
          data: [],
        });
      } else {
        const products = await Product.find({ catalogId: catalog._id }).select(
          "name price"
        );
        if (products.length == 0) {
          return res.status(404).json({
            error: "There're no products available in this catalog.",
            data: [],
          });
        } else {
          const data = {
            catalogId: catalog._id,
            catalogName: catalog.name,
            createdBy: catalog.created_by.name,
            products: products,
          };
          catalog["products"] = products;
          return res.status(200).json({
            message: "products found.",
            data: data,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }
  },
};
