<template lang="pug">
div.columns
  div.column
    h1.title Total balance
    h2.subtitle $ 10.000
    div.columns
      div.column.is-4 5% (24H)
      div.column.is-4 -10% (1M)
      div.column.is-4 +15% (1Y)
    div.column
      partial-tabs
//- v-container(fluid text-xs-center)*/
  v-layout(row wrap)
    v-flex(xs12)
      v-card.my-2(flat)
        v-card-title.headline(primary-title)
        v-card-text.headline $ 10.000
        v-layout(row wrap)
          v-flex(align-center xs4)
            v-card(flat)
              v-card-text +5% (24H)
          v-flex(align-center xs4)
            v-card(flat)
              v-card-text -10% (1M)
          v-flex(align-center xs4)
            v-card(flat)
              v-card-text +15% (1Y)
      v-card.my-2(flat)
        v-tabs(grow)
          v-tabs-bar
            v-tabs-slider
            v-tabs-item(
              v-for="(tab, index) in ui.tabs"
              :key="index"
              :href="tab"
              )
              span {{ tab }}
          v-tabs-items
            v-tabs-content#balances
              v-card(flat)
                v-tabs
                  v-tabs-bar
                    v-tabs-item(href='all')
                      span All
                    v-tabs-item(href='all')
                      span Cash
                    v-tabs-item(href='all')
                      span Crypto
                v-tabs-items
                  v-tabs-content
                    l
            v-tabs-content#stats
              v-card(flat)
                v-card-text stats
</template>

<script>
// import * as exmo from '~/api/exmo'

export default {
  components: {
    'partial-tabs': require('~/partials/dashboard/tabs').default
  },

  data() {
    return {

    }
  },


}
</script>
