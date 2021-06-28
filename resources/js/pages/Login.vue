<template>
  <v-app>
    <v-container fluid fill-height class="grey darken-4">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card elevation="18" class="rounded-xl" color="white mb-3 mx-auto">
            <v-card-text>
              <div class="layout column align-center">
                <img src="http://localhost:8000/storage/img/undraw_version_control_re_mg66.svg" alt="Vue Material Admin" width="180" height="180">
                <h1 class="flex my-4">App Inventory</h1>
              </div>
              <form-login />
            </v-card-text>
            <v-card-actions class="mb-5">
              <v-spacer></v-spacer>
              <v-btn block color="grey darken-4 text-light" @click="login" :loading="loading" class="rounded-pill">
                Login
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import FrmAuth from '../components/FormLogin.vue'
export default {
  created() {
      if (this.isAuth) {
          this.$router.push({ name: 'home' })
      }
  },
  components: {
      'form-login': FrmAuth,
  },
  computed: {
      ...mapState('auth', {
          loading: state => state.loading
      }),
      ...mapGetters(['isAuth']),
    	...mapState(['errors'])
  },

  methods: {
    ...mapActions('auth', ['submit']),
    ...mapMutations(['CLEAR_ERRORS']),
    login() {
      this.submit().then(() => {
          if (this.isAuth) {
              this.CLEAR_ERRORS()
              this.$router.push({ name: 'home' })
          }
      })
    }
  }
}
</script>
