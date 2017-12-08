import { create } from 'axios'
import { pick } from 'lodash'
import ms from 'ms'

const day = ms('24h')

const axios = create({
  baseURL: 'https://api.exmo.com/v1/'
})

const ticker = () => axios.get('/ticker').then(({ data }) => {
  const stats = []

  for(let pair in data) {
    const value = {
      provider: 'exmo',
      pair: pair.split('_'),
      now: {
        ask: parseFloat(data[pair].buy_price),
        bid: parseFloat(data[pair].sell_price),
        market: parseFloat(data[pair].last_trade)
      },
      periods: [
        {
          period: ms(day),
          from: Date.parse(data[pair].updated) - day,
          to: Date.parse(data[pair].updated),
          average: parseFloat(data[pair].avg),
          high: parseFloat(data[pair].high),
          low: parseFloat(data[pair].low),
          volume: parseFloat(data[pair].vol)
        }
      ]
    }

    stats.push(value)
  }

  return stats
})

export { ticker }
