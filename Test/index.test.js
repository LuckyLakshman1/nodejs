const db = require("../models/index.js");

describe("Database Configuration ", () => {
  test("Mongoose should be defined ", () => {
    expect(db.mongoose).toBeDefined();
  });

  test("URL shoild be defined", () => {
    expect(db.url).toBeDefined();
  });

  test("product model should be defined", () => {
    expect(db.products).toBeDefined();
  });
});
