<template lang="pug">
v-container(fluid fill-width)
	v-data-table(
		:headers="data.headers"
		:items="data.stats.current"
		:selected="data.selected"
		select-all
		v-model="data.selected"
		)
		template(slot="items" scope="props")
			tr
				td
					v-checkbox(
						primary
						hide-details
						v-model="props.selected"
						)
				td.text-xs-left {{ props.item.pair.join(' / ') }}
				td.text-xs-right {{ props.item.provider }}
				td.text-xs-right {{ props.item.now.ask.toFixed(3) }}
				td.text-xs-right {{ props.item.now.bid.toFixed(3) }}
</template>

<script>
import {
	ticker as cexticker
} from '~/api/cex'
import {
	ticker as exmoticker
} from '~/api/exmo'
import {
	ticker as hitbtcticker
} from '~/api/hitbtc'
import whilst from 'async/whilst'

export default {
	data() {
		return {
			intl: {},
			dev: {},
			data: {
				poll: false,
				interval: 5000,
				stats: {
					prev: [],
					current: []
				},
				selected: [],
				headers: [{
					text: 'Pair',
					align: 'left',
					sortable: false,
					value: 'pair'
				}, {
					text: 'Provider',
					align: 'right',
					sortable: true,
					value: 'provider'
				}, {
					text: 'Buy',
					align: 'right',
					sortable: true,
					value: 'now.ask'
				}, {
					text: 'Sell',
					align: 'right',
					sortable: true,
					value: 'now.bid'
				}],
				items: []
			}
		}
	},

	mounted() {
		this.togglePolling({
			target: {
				checked: true
			}
		})
	},

	methods: {
		togglePolling(e) {
			this.poll = e.target.checked
			whilst(() => this.poll, cb => this.get().then(() => setTimeout(() => cb(), this.data.interval)).catch(err => cb(err)))
		},

		get() {
			return Promise.all([
				exmoticker().catch(() => []),
				cexticker().catch(() => []),
				hitbtcticker().catch(() => [])
			]).then(tickers => {
				this.data.stats.prev = this.data.stats.current
				this.data.stats.current = tickers.reduce((a, b) => a.concat(b), []).sort((a, b) => {
					for (let char in a.pair[0]) {
						if (a.pair[0][char] > b.pair[0][char])
							return 1
						if (a.pair[0][char] < b.pair[0][char])
							return -1
					}
					for (let char in a.pair[1]) {
						if (a.pair[1][char] > b.pair[1][char])
							return 1
						if (a.pair[1][char] < b.pair[1][char])
							return -1
					}
					if (a.now.market > b.now.market)
						return -1
					if (a.now.market < b.now.market)
						return 1

					return 0
				})
			}).catch(err => console.error(err))
		}
	}
}
</script>

<style lang="sass">

</style>
