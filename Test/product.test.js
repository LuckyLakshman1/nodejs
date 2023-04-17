const productController = require("../controllers/product.controllers.js");
const db = require("../models/index.js");
const Product = db.products;
const { query } = require("express");

describe("Product Controller", () => {
  beforeAll(async () => {
    // connect to the database before running the tests
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.mongoose.connection.close();
  });

  afterEach(async () => {
    // remove all products from the database after each test
    await Product.deleteMany({});
  });

  describe("create()", () => {
    test("should create a new product", async () => {
      const req = {
        body: {
          productName: "Test Product",
          productDetails: "This is a test product",
          productQuantity: 10,
          productPrice: 9.99,
        },
      };
      const res = {
        send: jest.fn().mockImplementation((data) => {
          expect(data.productName).toEqual("Test Product");
          expect(data.productDetails).toEqual("This is a test product");
          expect(data.productQuantity).toEqual(10);
          expect(data.productPrice).toEqual(9.99);
        }),
        status: jest.fn(),
      };
      await productController.create(req, res);
      expect(res.send).toHaveBeenCalled();
    });

    test("should return an error if productName is missing", async () => {
      const req = {
        body: {
          productDetails: "This is a test product",
          productQuantity: 10,
          productPrice: 9.99,
        },
      };
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnValue({
          send: jest.fn().mockImplementation((data) => {
            expect(data.message).toEqual("Product name cannot be empty");
          }),
        }),
      };
      await productController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("findAll()", () => {
    test("should return all products if no query is provided", async () => {
      const req = {
        query: {},
      };
      const res = {
        send: jest.fn().mockImplementation((data) => {
          expect(data.length).toBe(3); // assuming there are 3 products in the database
        }),
        status: jest.fn(),
      };
      await productController.findAll(req, res);
      expect(res.send).toHaveBeenCalled();
    });

    test("should return products that match the query", async () => {
      const req = {
        query: {
          productName: "Test",
        },
      };
      const res = {
        send: jest.fn().mockImplementation((data) => {
          expect(data.length).toBe(2); // assuming there are 2 products with productName containing "Test" in the database
        }),
        status: jest.fn(),
      };
      await productController.findAll(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("deleteAll()", () => {
    test("should delete all products", async () => {
      const req = {};
      const res = {
        send: jest.fn().mockImplementation((data) => {
          expect(data.message).toEqual("Products deleted successfully");
        }),
        status: jest.fn(),
      };
      await productController.deleteAll(req, res);
      expect(res.send).toHaveBeenCalled();
    });
  });
});

// describe("Product controller", () => {
//   beforeAll(async () => {
//     await db.mangoose.connect(db.url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   afterAll(async () => {
//     await db.mangoose.connection.close();
//   });

//   afterEach(async () => {
//     await Product.deleteMany({});
//   });

//   describe("Creat", () => {
//     test("Should create a new product ", async () => {
//       const req = {
//         body: {
//           productName: "Testing product",
//           productDetails: "Testing product details",
//           productQuantity: 10,
//           productPrice: 12.33,
//         },
//       };
//       const res = {
//         send: jest.fn().mockImplementaion((data) => {
//           expect(data.productName).toEqual("Testing Product");
//           expect(data.productDetails).toEqual("Tesing product details");
//           expect(data.productQuantity).toEqaul(10);
//           expect(data.productPrice).toEqual(12.33);
//         }),
//         status: jest.fn(),
//       };
//       await productController.create(req, res);
//       expect(res.send).toHaveBeenCalled();
//     });

//     test("should retrun an error if productName is missing ", async () => {
//       const req = {
//         body: {
//           productDetails: "Testing product details",
//           productQuantity: 10,
//           productPrice: 12.33,
//         },
//       };
//       const res = {
//         send: jest.fn(),
//         status: jest.fn().mockReturnValue({
//           send: jest.fn().mockImplementaion((data) => {
//             expect(data.message).toEqaul("Product name cannot be empty");
//           }),
//         }),
//       };
//       await productController.create(req, res);
//       expect(res.status).toHaveBeenCalledWith(400);
//     });
//   });

//   describe("findAll", () => {
//     test("should return all queries if no query is provided ", async () => {
//       const req = {
//         query: {},
//       };
//       const res = {
//         send: jest.fn().mockImplementaion((data) => {
//           expect(data.length).toBe(3);
//         }),
//         status: jest.fn(),
//       };
//       await productController.findAll(req, res);
//       expect(res.send).toHaveBeenCalled();
//     });
//   });

//   test("should retrun the products that match teh query ", async () => {
//     const req = {
//       query: {
//         productName: "Testing Product",
//       },
//     };
//     const res = {
//       send: jest.fn().mockImplementaion((data) => {
//         expect(data.length).toBe(2);
//       }),
//       status: jest.fn(),
//     };
//     await productController.findAll(req, res);
//     expect(res.send).toHaveBeenCalled();
//   });

//   describe("deleteAll()", () => {
//     test("should delete all products", async () => {
//       const req = {};
//       const res = {
//         send: jest.fn().mockImplementaion((data) => {
//           expect(data.message).toEqaul("PRoducts deleted successfully");
//         }),
//         status: jest.fn(),
//       };
//       await productController.deleteAll(req, res);
//       expect(res.send).toHaveBeenCalled();
//     });
//   });
// });
