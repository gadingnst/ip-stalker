<template>
  <div class="container">
    <h1>IP Stalker | By: Sutanlab</h1>
    <hr />
    <Search />
    <Info />
  </div>
</template>

<script>
import Search from './components/Search'

export default {
  components: {
    Search,
    Info: () => import('./components/Info')
  }
}
</script>