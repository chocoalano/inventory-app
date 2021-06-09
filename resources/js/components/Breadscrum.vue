<template>
   <div>
     <v-breadcrumbs>
        Pages
        <!-- <template>
          <v-icon>mdi-forward</v-icon>
        </template> -->
        /
        {{ $route.meta.title }}
      </v-breadcrumbs>
   </div>
</template>
<script>
  export default {

  }
</script>
