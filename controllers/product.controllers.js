const db = require("../models/index.js");
const Product = db.products;
exports.create = (req, res) => {
    if (!req.body.productName) {
        res.status(400).send({ mesaage: "cannot be empty " })
        return;
    }
    const product = new Product({
        productName: req.body.productName,
        productDetails: req.body.productDetails,
        productQuantity: req.body.productQuantity,
        productPrice:req.body.productPrice
    })
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'somethinf error occured'
            });
        });
};
exports.findAll = (req, res) => {
    const productName = req.query.productName;
    var condition = productName ? { productName: { $regex: new RegExp(productName), $options: "a-z" } } : {};

    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "error occured" });
        })
}
exports.deleteAll = (req, res) => {
    Product.deleteMany({}).then(data=>{
        res.send({mesaage:` products deleted successfully `});
    })
    .catch(err =>{
        res.status(500).send({
            message :err.mesaage || `some error occured`
        })
    })
}