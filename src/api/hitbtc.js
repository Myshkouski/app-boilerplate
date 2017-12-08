import { create } from 'axios'
import { pick } from 'lodash'
import ms from 'ms'

const day = ms('24h')

const axios = create({
  baseURL: 'https://api.hitbtc.com/api/1/'
})

const ticker = () => axios.get('/public/ticker/').then(({ data }) => {
  const stats = []

  for(let pair in data) {
    const value = {
      provider: 'hitbtc',
      pair: [pair.slice(-3), pair.slice(0, -3)],
      now: {
        ask: parseFloat(data[pair].ask),
        bid: parseFloat(data[pair].bid),
        market: parseFloat(data[pair].last)
      },
      periods: [
        {
          period: ms(day),
          from: Date.parse(data[pair].timestamp) - day,
          to: Date.parse(data[pair].timestamp),
          average: undefined,
          high: parseFloat(data[pair].high),
          low: parseFloat(data[pair].low),
          volume: parseFloat(data[pair].volume)
        }
      ]
    }

    stats.push(value)
  }

  return stats
})

export { ticker }
