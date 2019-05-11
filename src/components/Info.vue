<template>
  <div class="form">
    <Map
      v-if="Object.keys(info).length > 0"
      :latitude="info.latitude.value || 0"
      :longitude="info.longitude.value || 0"
      :zoom="7"
    />
    <fieldset v-for="(data, i) in info" class="form-group" :key="i">
      <label>{{ data.label }}</label>
      <input
        type="text"
        class="form-control"
        disabled
        :value="data.value !== null ? data.value : 'NULL'"
      >
    </fieldset>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    Map: () => import('./Map')
  },
  computed: {
    ...mapState({
      info: state => state.ipInfo
    })
  }  
}
</script>

<style scoped>
.form {
  margin: 0 auto;
  padding: 20px 0;
}
</style>
