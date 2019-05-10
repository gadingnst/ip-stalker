<template>
  <div class="container">
    <Github url="https://github.com/sutanlab/ip-stalker" />
    <h1>IP Stalker | By: Sutanlab</h1>
    <hr />
    <Search />
    <Info />
  </div>
</template>

<script>
import Search from './components/Search'
import Github from './components/Github'

export default {
  components: {
    Github,
    Search,
    Info: () => import('./components/Info')
  }
}
</script>