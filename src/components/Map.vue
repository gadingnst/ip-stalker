<template>
  <div style="text-align: center;">
    <h2 style="margin-bottom: 10px; color: #4CAF50">IP Location</h2>
    <iframe 
      width="300" 
      height="170" 
      frameborder="0" 
      scrolling="no" 
      marginheight="0" 
      marginwidth="0"
      :src="`https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&amp;output=embed`"
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
    },
    zoom: {
      type: Number,
      default: 15
    }
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  height: 300px;
}
</style>
