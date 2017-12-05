<template lang="pug">
v-container(fluid fill-width)
	v-tabs(grow v-model="ui.tabs.active")
		v-tabs-bar.orange.lighten-1
			v-tabs-item(
				v-for="tab in data.tabs"
				:key="tab.key"
				:href="`#${tab.key}`"
				ripple
			)
				span {{ tab.key }}
		v-tabs-slider
		v-tabs-items
			v-tabs-content(
				v-for="tab in data.tabs"
				:key="tab.key"
				:id="tab.key"
			)
				v-card(flat)
					v-card-text {{ tab.text }}
</template>

<script>
export default {
  data() {
    return {
      ui: {
        tabs: {
          active: null
        }
      },
      intl: {},
      dev: {},
      data: {
        tabs: [{
          key: 'tab-1',
          text: 'Tab 1'
        }, {
          key: 'tab-2',
          text: 'Tab 2'
        }]
      }
    }
  },

  methods: {
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    }
  }
}
</script>

<style lang="sass">

</style>
