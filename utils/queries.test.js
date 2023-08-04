const queries = require("./queries")
const logger = require("../utils/logger")

const run = () => {
  describe("Helper queries.js", () => {
    beforeAll(() => {
      jest.unmock("./queries")
      jest.resetModules()
    })
    it("should get cities which match query string", async () => {
      const response = await queries.searchForCities("New Yo")
      const resultCities = response.result
      console.log("🚀 ~ file: queries.test.js:8 ~ it ~ resultCities:", resultCities)

      expect(resultCities).toEqual(
        expect.arrayContaining(["West New York", "New York"])
      )
    })
  })
}

module.exports = { run }
