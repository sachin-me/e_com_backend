const Catalog = require("../models/Catalog");
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
      const catalog = await Catalog.findOne({ name: name });
      if (catalog) {
        return res.status(200).json({
          message: "Catalog already exists.",
        });
      } else {
        const newCatalog = new Catalog({
          name,
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
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong.",
      });
    }
  },
};
