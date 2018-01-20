const express = require( 'express' )
const dns = require( 'dns' )
const url = require( 'url' )

const app = express()

app.use( '*', ( req, res ) => {
  console.log( req.hostname, req.url )
  // console.log( url.resolve( req.hostname + ':3000', req.url ) )
  res.redirect( 301, req.hostname + ':3000' + req.url )
} )

dns.lookup( require( 'os' )
  .hostname(), ( err, addr ) => {
    console.log( addr )
    app.listen( 8080, addr )
  } )
