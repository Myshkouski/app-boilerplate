<template lang="pug">
b-tabs.is-fullwidth(v-model="tab")
	b-tab-item(label="One")
		div.tile.is-ancestor
			div.tile.is-parent.is-vertical.is-8
				div.tile.is-child
					div.card
						p TILE
				div.tile.is-child
					div.card
						p TILE
			div.tile.is-parent
				div.tile.is-child
					div.card
						p TILE
	b-tab-item(label="Two")
	b-tab-item(label="Three")
</template>

<script>
export default {
  computed: {
    tab: {
      get() {
        return parseInt(this.$route.query.tab) || 0
      },
      set(tab) {
        this.$router.push({ query: { tab } })
      }
    }
  }
}
</script>

<style lang="sass">
.b-tabs.is-fullwidth li
	flex-grow: 1
  flex-shrink: 0
</style>
