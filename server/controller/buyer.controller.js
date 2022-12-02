const jwt = require("jsonwebtoken");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
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
  createOrder: async (req, res) => {
    try {
      const { seller_id } = req.params;
      const { catalogName, products } = req.body;
      if (!catalogName && products.length == 0) {
        return res.status(400).json({
          error: "Name and Products are required.",
        });
      }

      if (!catalogName) {
        return res.status(400).json({
          error: "Name is required.",
        });
      }
      if (products.length == 0) {
        return res.status(400).json({
          error: "Products are required.",
        });
      }

      let token = req.headers.cookie.split("token=");
      token = token[token.length - 1];
      const user = jwt.verify(token, process.env.SECRET);
      const { id, role } = user;

      if (role == "buyer") {
        const catalog = await Catalog.findOne({ name: catalogName });
        if (!catalog) {
          return res.status(404).json({
            error: "Catalog not found.",
          });
        } else {
          products &&
            products.map(async (product) => {
              const data = await Product.findOne({ name: product.name });
              const order = new Order({
                count: product.count,
                buyerId: id,
                sellerId: seller_id,
              });
              const createdOrder = await order.save();
              if (Object.keys(createdOrder).length !== 0) {
                await Order.findOneAndUpdate(
                  { _id: createdOrder._id },
                  {
                    $set: { catalog: catalog._id },
                    $push: { products: data._id },
                  }
                );
              } else {
                return res.status(500).json({
                  error: "Failed to create order.",
                });
              }
            });

          return res.status(200).json({
            message: "Your order is placed successfully",
          });
        }
      } else {
        return res.status(401).json({
          error: "You're not authorised to create a order.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }
  },
};
