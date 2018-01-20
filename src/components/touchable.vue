<template lang="pug">
div.root
  slot(
    :trackers="$touchable.trackers"
    :data="{ center, rotation }"
    )
</template>

<script>
import {
  Emitter as TrackerEmitter,
  Handler as TrackerHandler
} from '~/mixins/touchable'

export default {
  mixins: [ TrackerEmitter, TrackerHandler ]
}
</script>
