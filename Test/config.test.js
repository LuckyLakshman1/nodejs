const config = require("../configuration/config.js");


describe("Database Configuration ", () => {
  test("url should be defined ", () => {
    expect(config.url).toBeDefined();
  });

  test("url shoub be a string ", () => {
    expect(typeof config.url).toBe("string");
  });

  test('url should be a valid MongoDB connection string', () => {
        expect(() => {
          new URL(config.url);
        }).not.toThrow();
      });

  test("config fiel should not contain sensitive data", () => {
    const sensitiveData = ["password", "secret", "key"];
    sensitiveData.forEach((key) => {
      expect(config.url).not.toContain(key);
    });
  });

  test("config should not throw erors when file is loaded", () => {
    expect(() => {
      require('../configuration/config.js').not.toThrow();
    });
  });
});
