module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          productName: String,
          productDetails: String,
          productQuantity: Number,
          productPrice:Number
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Product = mongoose.model("Products", schema);
    return Product;
  };