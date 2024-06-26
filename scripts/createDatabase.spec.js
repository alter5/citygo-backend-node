const createDatabase = require("./createDatabase")
const { dbClient } = require("../utils/dbClient")
const queries = require("../utils/queries")
const config = require("../utils/config")

const logger = require("../utils/logger")
const testUtils = require("../test/testUtils")

describe("Script createDatabase.js", () => {
  afterAll(async () => {
    await testUtils.tearDownSuite()
  })

  const databaseName = config.DATABASE_CONFIG.database
  it(
    "connection to the database " + databaseName + " is successful",
    async () => {
      let isConnectedSuccessfully = false
      try {
        const connection = await dbClient.connect()
        connection.done()
        isConnectedSuccessfully = true
      } catch (err) {
        isConnectedSuccessfully = false
        logger.error("Connection error:", err.stack)
      }
      expect(isConnectedSuccessfully).toBe(true)
    }
  )

  it("should have inserted rows into the cities table", async () => {
    const cityName = "New York"
    const row = await dbClient.one(
      "SELECT * FROM cities WHERE city_name = $1",
      [cityName]
    )
    expect(row.city_name).toEqual(cityName)
  })

  it("should have a table called trips", async () => {
    const tableName = "trips"
    const sql = /* SQL */ `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name = 'trips';
    `
    const record = await dbClient.one(sql)
    expect(record.table_name).toBe(tableName)
  })
})
