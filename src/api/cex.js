import { create } from 'axios'
import { pick } from 'lodash'
import ms from 'ms'

const day = ms('24h')

const axios = create({
  baseURL: 'https://cex.io/api/'

})

const currencies = ["USD", "EUR", "RUB", "BTC", "ETH", "BCH", "ZEC", "LTC", "DASH"].join('/')

const ticker = () => axios.get('/tickers/' + currencies).then(({ data }) => {
  const stats = []

  for(let pair in data.data) {
    const value = {
      provider: 'cex',
      pair: data.data[pair].pair.split(':'),
      now: {
        ask: parseFloat(data.data[pair].ask),
        bid: parseFloat(data.data[pair].bid),
        market: parseFloat(data.data[pair].last)
      },
      periods: [
        {
          period: ms(day),
          from: Date.parse(data.data[pair].timestamp) - day,
          to: Date.parse(data.data[pair].updated),
          average: undefined,
          high: parseFloat(data.data[pair].high),
          low: parseFloat(data.data[pair].low),
          volume: parseFloat(data.data[pair].volume)
        }
      ]
    }

    stats.push(value)
  }

  return stats
})

export { ticker }
