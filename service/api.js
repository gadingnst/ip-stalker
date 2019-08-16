const express = require('express')
const serverless = require('serverless-http')
const parser = require('body-parser')
const { get: fetch } = require('axios')

const app = express()
const route = express.Router()

const endpoints = addr => [
  `http://api.ipstack.com/${addr}?access_key=${process.env.API_KEY_IPSTACK}`,
  `http://ip-api.com/json/${addr}?fields=mobile`,
  `http://free.ipwhois.io/json/${addr}`,
  `https://api.ipdata.co/${addr}?api-key=${process.env.API_KEY_IPDATA}`
]

route.get('/:addr', async (req, res) => {
  const valid = req
    .params
    .addr
    .trim()
    .match(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/)

  if (valid) {
    try {
      const result = await Promise.all(endpoints(req.params.addr).map(endpoint => (
        fetch(endpoint).then(({ data }) => data)
          .catch(({ response }) => console.log(response.data.message))
      )))
      
      res.status(200).send(result.reduce((acc, cur) => ({
        ...acc,...cur
      })))
    } catch (err) {
      console.error(err)
      res.status(500).send({
        code: 500,
        message: 'Internal server error'
      })
    }
  } else {
    res.status(400).send({
      message: 'Request is not valid IP address'
    })
  }
})

app.use(parser.json())
app.use('/.netlify/functions/api', route) // original lambda path : /.netlify/functions/index

module.exports = app
module.exports.handler = serverless(app)
