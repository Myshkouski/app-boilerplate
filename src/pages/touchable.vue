<template lang="pug">
  div.box
    touchable.wrapper
      template(slot-scope="props")
        div.central(
          v-if="props.data.center && props.data.rotation"
          :style=`{
            left: props.data.center.end[0] + 'px',
            top: props.data.center.end[1] + 'px',
            transform: 'rotate3d(' + props.data.rotation.join(',') + 'rad)'
          }`
          )
          h2 {{ props.data.rotation }}
          //- h2 {{props.data.center.delta.absolute[0]}}, {{ props.data.center.delta.absolute[1] }}
        div.tracker(
          v-for="(tracker, index) in props.trackers"
          :key="index"
          :style="{ left: tracker.end[0] + 'px', top: tracker.end[1] + 'px' }"
          :id="tracker.id"
          )
          //- h2 id: {{ tracker.absoluteVector }}
</template>

<script>
// import RippleMixin from '~/mixins/ripple'
import touchable from '~/components/touchable'

export default {
  components: {
    touchable
  },

  data() {
    return {
      trackers: []
    }
  },

  computed: {
    central() {

    }
  },
}
</script>

<style lang="sass" scoped>
  .box
    display: flex

  .wrapper
    position: relative
    width: 300px
    height: 300px
    margin: auto
    background-color: gray
    transform-style: preserve-3d

  .tracker, .central
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0

  .tracker
    background-color: red
    margin-top: -5px
    margin-left: -5px
    width: 10px
    height: 10px
    border-radius: 50%

  .central
    background-color: green
    margin-top: -25px
    margin-left: -25px
    width: 50px
    height: 50px
</style>
