const jwt = require("jsonwebtoken");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const Product = require("../models/Product");

module.exports = {
  createCatalog: async (req, res) => {
    let { name, products } = req.body;

    if (!name && products.length == 0) {
      return res.status(400).json({
        error: "Name and Products are required.",
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "Name is required.",
      });
    }
    if (products.length == 0) {
      return res.status(400).json({
        error: "Products are required.",
      });
    }

    try {
      let token = req.headers.cookie.split("token=");
      token = token[token.length - 1];
      const user = jwt.verify(token, process.env.SECRET);
      const { id, role } = user;

      const catalog = await Catalog.findOne({ name: name });
      if (catalog) {
        return res.status(403).json({
          error: "Catalog already exists.",
        });
      } else {
        if (role === "seller") {
          const newCatalog = new Catalog({
            name,
            created_by: id,
          });

          newCatalog.save((err, doc) => {
            if (err) {
              return res.status(500).json({
                error: "Failed to create catalog. Please try again.",
              });
            } else {
              products &&
                products.forEach(({ name, price }) => {
                  const data = new Product({
                    name,
                    price,
                    catalogId: doc._id,
                  });
                  data.save((error) => {
                    if (error) {
                      return res.status(500).json({
                        error: "Failed to create product. Please try again.",
                      });
                    }
                  });
                });
              return res.status(200).json({
                message: "Catalog created successfully",
                data: {
                  id: newCatalog._id,
                  name,
                },
              });
            }
          });
        } else {
          return res.status(401).json({
            error: "You're not authorised to create a catalog.",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }
  },
  getOrders: async (req, res) => {
    try {
      let token = req.headers.cookie.split("token=");
      token = token[token.length - 1];
      const user = jwt.verify(token, process.env.SECRET);
      const { id, role } = user;

      if (role == "seller") {
        const orders = await Order.find({ sellerId: id });
        if (orders.length !== 0) {
          return res.status(200).json({
            message: "Order list fetched successfully",
            data: orders,
          });
        } else {
          return res.status(404).json({
            error: "No orders found.",
            data: [],
          });
        }
      } else {
        return res.status(401).json({
          error: "You're not authorised to get orders list.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }
  },
};
