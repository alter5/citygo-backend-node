const request = require("supertest")
const app = require("../app")
const queries = require("../utils/queries")
const testUtils = require("../test/testUtils")

jest.mock("../utils/queries")

describe("Controller cities.js", () => {
  const url = "/api/cities"
  
  afterAll(async () => {
    // Close the connection pool created by importing the queries module
    await testUtils.tearDownSuite()
  })

  it("should return cities from the queries utility module", async () => {
    const mockResponse = { data: ["Manchester", "Liverpool"] }

    queries.searchForCities.mockResolvedValueOnce(mockResponse)

    const response = await request(app)
      .get(url + "/search")
      .query({ queryString: "Lorem ipsum" })

    expect(response.status).toBe(200)
    expect(response.header["content-type"]).toContain("application/json")
    expect(response.body.data).toEqual(
      expect.arrayContaining(mockResponse.data)
    )
  })
})
