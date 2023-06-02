const pgPromise = require("pg-promise")
const config = require("../utils/config")
const citiesRouter = require("express").Router()
const dbConfig = require("../utils/dbClient")
const queries = require("./queries")

citiesRouter.get("/test", async (request, response) => {
  response.json({ result: "Success" })
})

citiesRouter.get("/search", async (request, response) => {
  const queryString = request.query.queryString
  const result = await queries.searchForCity(queryString)
  response.json(result)
})

module.exports = citiesRouter
