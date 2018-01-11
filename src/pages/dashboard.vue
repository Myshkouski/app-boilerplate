<template lang="pug" src="~/assets/markup/pages/dashboard.pug"></template>

<script>
export default {
  components: {
    'partial-tabs': require('~/partials/dashboard/tabs').default
  },

  data() {
    return {
      banners: [
        'https://www.google.by/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjW9tzCs8jYAhUIVSwKHXPzAnEQjBwIBA&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1467173572719-f14b9fb86e5f%3Fdpr%3D1%26auto%3Dformat%26fit%3Dcrop%26w%3D376%26h%3D251%26q%3D60%26cs%3Dtinysrgb&psig=AOvVaw2gzh595_XYX_q_HQzTVReF&ust=1515502127832041',
        'https://www.google.by/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwit2bjIs8jYAhWIGCwKHRt5DXIQjBwIBA&url=https%3A%2F%2Fimages7.alphacoders.com%2F411%2Fthumb-1920-411820.jpg&psig=AOvVaw2gzh595_XYX_q_HQzTVReF&ust=1515502127832041',
        'https://www.google.by/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjd59jMs8jYAhXG2SwKHSO-BGkQjBwIBA&url=https%3A%2F%2Fstatic.pexels.com%2Fphotos%2F33109%2Ffall-autumn-red-season.jpg&psig=AOvVaw2gzh595_XYX_q_HQzTVReF&ust=1515502127832041'
      ],
      ui: {
        
      }
    }
  },


}
</script>

<style src"~/assets/style/pages/dashboard.sass" lang="sass"></style>
