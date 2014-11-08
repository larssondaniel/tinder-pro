express = require 'express' 
bodyParser = require 'body-parser'
app = express()

app.get '/', (req, res)->
	res.send 'Hello Tinder'





server = app.listen process.env.PORT || 3000 , ()->

  host = server.address().address
  port = server.address().port

  console.log 'Listening at http://%s:%s', host, port