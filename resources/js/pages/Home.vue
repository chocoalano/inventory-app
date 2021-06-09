<template>
  <div>
    <v-container>
      <breadcrumb></breadcrumb>
      <v-alert
          border="left"
          colored-border
          color="deep-purple accent-4"
          elevation="2"
        >
          Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..

          Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
        </v-alert>
      </v-container>
  </div>
</template>
<script type="text/javascript">
  import Breadcrumb from '../components/Breadscrum.vue'
  export default{
    name: 'home',
    components: {
        'breadcrumb': Breadcrumb
    }
  }
</script>
