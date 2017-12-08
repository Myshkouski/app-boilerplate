<template></template>

<script>
export default {
  fetch( {
    params,
    redirect
  } ) {
    redirect( 301, '/tickers' )
  }
}
</script>
