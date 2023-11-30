const { dbClient } = require("./dbClient")
const logger = require("../utils/logger")
const config = require("./config")

const searchForCities = async (queryString) => {
  const sql = /* SQL */ `
  SELECT * FROM cities
  WHERE city_name ILIKE $1
  ORDER BY population desc
  `

  // Add wildcard operators
  queryString = "%" + queryString + "%"
  const cities = await dbClient.any(sql, [queryString])

  return createSuccessfulResponse(cities)
}

const createSuccessfulResponse = (data) => {
  return { success: true, data }
}

const createErrorResponse = (error) => {
  return { success: false, error }
}

// const getMostPopulousCities = asnyc () => {
//   const sql = /* SQL */ `
//   hi
//   `
//   return null
// }

// const searchForCities1 = async (queryString) => {
//   const sql = `
//   SELECT * FROM cities
//   WHERE city_name like $1
//   ORDER BY population desc
//   `

//   const response = {}

//   try {
//     const cities = await dbClient.any(sql, [`%${queryString}%`])
//     response.result = cities
//   } catch (error) {
//     response.error = error
//   }

//   return response
// }

module.exports = { searchForCities }
