<template>
  <div class="form">
    <fieldset class="form-group form-success">
      <label for="ipaddr">IP Address:</label>
      <input v-model="address" id="ipaddr" type="text" placeholder="Any Public IP Address" class="form-control">
      <div v-if="error.trim().length > 0" class="help-block" style="color: crimson">
        {{ error }}
      </div>
    </fieldset>
    <div class="form-actions" style="text-align: right">
      <button style="margin: 5px 0;" class="btn btn-success btn-ghost" @click="stalk()">
        🔍 Go Stalk !
      </button>
    </div>
    <div v-if="loading" class="loading"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    address: '',
    error: '',
    loading: false
  }),
  methods: {
    ...mapMutations({
      setIpInfo: 'setIpInfo'
    }),
    async stalk() {
      this.error = ''
      this.loading = true
      const response = await window.fetch(`${process.env.VUE_APP_API_ENDPOINT}${this.address}`)
      const result = await response.json()
      this.setIpInfo({ ...result })
      this.loading = false      
    }
  }
}
</script>

<style scoped>
.form {
  margin: 0 auto;
  text-align: center;
}
.loading {
  height: 80px;
  width: 80px;
}
</style>
