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
      <button style="margin: 5px" class="btn btn-success btn-ghost" @click="stalk()">
        🔍 Go Stalk !&nbsp;
        <span v-if="loading" class="loading" />
      </button>
      <button v-if="Object.keys(ipInfo).length > 0" style="margin: 5px" class="btn btn-default btn-ghost" @click="reset()">
        🔄 Clear
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    address: '',
    error: '',
    loading: false
  }),
  computed: {
    ...mapState({
      ipInfo: state => state.ipInfo
    })
  },
  methods: {
    ...mapMutations({
      setIpInfo: 'setIpInfo',
      reset: 'resetIpInfo'
    }),
    async stalk() {
      this.error = ''
      this.loading = true

      try {
        if (this.address.trim().length === 0 ) throw new Error('IP Address must not be empty!')
        const response = await window.fetch(`${process.env.VUE_APP_API_ENDPOINT}${this.address}`)
        if (response.status === 400) {
          throw new Error(`You've entered invalid IP Address!`)
        } else if (response.status !== 200) {
          throw new Error(`Unknown Error, Check your Connection!`)
        }
        const result = await response.json()
        this.setIpInfo({ ...result })
      } catch (err) {
        this.error = err.message
      }

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
</style>
