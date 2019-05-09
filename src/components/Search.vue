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

      const valid = this
        .address
        .trim()
        .match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      
      if (valid) {
        const results = await Promise.all(this.requests())
        this.setIpInfo({
          ...results[0],
          ...results[1],
          ...results[2],
          ...results[3]
        })
      } else {
        this.error = `You've entered invalid IP Address`
      }

      this.loading = false      
    },
    requests() {
      return [
        window.fetch(`${process.env.VUE_APP_ENDPOINT1}${this.address}?access_key=${process.env.VUE_APP_KEY1}`)
          .then(response => response.json())
          .then(result => result),
        window.fetch(`${process.env.VUE_APP_ENDPOINT2}${this.address}?fields=mobile`)
          .then(response => response.json())
          .then(result => result),
        window.fetch(`${process.env.VUE_APP_ENDPOINT3}${this.address}`)
          .then(response => response.json())
          .then(result => result),
        window.fetch(`${process.env.VUE_APP_ENDPOINT4}${this.address}?api-key=${process.env.VUE_APP_KEY2}`)
          .then(response => response.json())
          .then(result => result)  
      ]
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
