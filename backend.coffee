express = require 'express' 
bodyParser = require 'body-parser'
app = express()

app.get '*', (req, res)->
	res.send 'Hello Tinder'