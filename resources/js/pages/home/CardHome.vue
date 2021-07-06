<template>
  <v-row class="mt-3">
    <v-col cols="12" sm="3">
      <v-card class="rounded-xl" color="grey darken-3 mb-3 mx-auto" dark>
        <v-img :src="baseUrl+'/storage/img/undraw_Dashboard_re_3b76.png'" height="200px"></v-img>
        <v-card-actions class="d-flex flex-no-wrap justify-space-between">
          <v-card-subtitle>
            Machine Learning
          </v-card-subtitle>
          <v-btn rounded color="grey darken-2" dark fab x-small @click="dialog()">
            <v-icon>mdi-file-search-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="3">
      <v-card class="rounded-xl" color="grey darken-3 mb-3 mx-auto" dark>
        <v-img :src="baseUrl+'/storage/img/undraw_Mobile_login_re_9ntv.png'" height="200px"></v-img>
          <v-card-actions class="d-flex flex-no-wrap justify-space-between">
            <v-card-subtitle>
              1,000 miles of wonder
            </v-card-subtitle>
            <v-btn rounded color="grey darken-2" dark fab x-small>
              <v-icon>mdi-file-search-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
    <v-col cols="12" sm="3">
      <v-card class="rounded-xl" color="grey darken-3 mb-3 mx-auto" dark>
        <v-img :src="baseUrl+'/storage/img/undraw_Growth_analytics_re_pyxf.png'" height="200px"></v-img>
          <v-card-actions class="d-flex flex-no-wrap justify-space-between">
            <v-card-subtitle>
              1,000 miles of wonder
            </v-card-subtitle>
            <v-btn rounded color="grey darken-2" dark fab x-small>
              <v-icon>mdi-file-search-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
    <v-col cols="12" sm="3">
      <v-card class="rounded-xl" color="grey darken-3 mb-3 mx-auto" dark>
        <v-img :src="baseUrl+'/storage/img/undraw_visual_data_re_mxxo.png'" height="200px"></v-img>
          <v-card-actions class="d-flex flex-no-wrap justify-space-between">
            <v-card-subtitle>
              1,000 miles of wonder
            </v-card-subtitle>
            <v-btn rounded color="grey darken-2" dark fab x-small>
              <v-icon>mdi-file-search-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
  </v-row>
</template>
<script type="text/javascript">
  import { mapState, mapActions } from 'vuex';
  export default{
    computed: {
        ...mapState(['baseUrl'])
    },
    methods: {
        dialog() {
          this.$store.commit('home/SET_DIALOG', true)
        },
    }
  }
</script>
