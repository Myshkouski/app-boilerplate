import {
  create
} from 'axios'
import {
  pick
} from 'lodash'
import ms from 'ms'
import crypto from 'crypto-js'

const day = ms( '24h' )

const axios = create( {
  baseURL: 'https://api.exmo.com/v1/'
} )

let nonce = new Date()
  .getTime()

const sign = ( message, secret ) => crypto
  .HmacSHA512( message, secret )
  .toString( crypto.enc.hex )

function serialize( obj ) {
  var str = [];
  for ( var p in obj )
    if ( obj.hasOwnProperty( p ) ) {
      str.push( encodeURIComponent( p ) + "=" + encodeURIComponent( obj[ p ] ) );
    }
  return str.join( "&" );
}

export const ticker = () => axios.get( '/ticker' )
  .then( ( {
    data
  } ) => {
    const stats = []

    for ( let pair in data ) {
      const value = {
        provider: 'exmo',
        pair: pair.split( '_' ),
        now: {
          ask: parseFloat( data[ pair ].buy_price ),
          bid: parseFloat( data[ pair ].sell_price ),
          market: parseFloat( data[ pair ].last_trade )
        },
        periods: [ {
          period: ms( day ),
          from: Date.parse( data[ pair ].updated ) - day,
          to: Date.parse( data[ pair ].updated ),
          average: parseFloat( data[ pair ].avg ),
          high: parseFloat( data[ pair ].high ),
          low: parseFloat( data[ pair ].low ),
          volume: parseFloat( data[ pair ].vol )
        } ]
      }

      stats.push( value )
    }

    return stats
  } )

export const user = ( {
  key,
  secret
} ) => {

  return Promise.resolve( serialize( {
      nonce: ++nonce
    } ) )
    .then( data => axios.post( '/user_info', data, {
      headers: {
        key,
        sign: sign( data, secret )
      }
    } ) )
}
