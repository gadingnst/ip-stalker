<template>
  <div class="form">
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
