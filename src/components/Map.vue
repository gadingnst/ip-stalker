<template>
  <div style="text-align: center">
    <h2 style="margin: 0; color: #4CAF50">Lokasi IP</h2>
    <iframe 
      width="300" 
      height="170" 
      frameborder="0" 
      scrolling="no" 
      marginheight="0" 
      marginwidth="0" 
      :src="`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp;output=embed`"
    />
  </div>
</template>

<script>
export default {
  props: {
    latitude: {
      type: Number,
      default: 0
    },
    longitude: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
iframe {
  width: 350px;
  height: 300px;
  margin: 5px;
}
</style>
