<template>
  <v-app id="inspire">
  <app-navbar v-if="isAuth" />
    <v-dialog v-model="expired" width="500">
      <v-card class="grey darken-3 rounded-xl" dark>
        <v-card-title class="text-h5">
          Reauthenticated ! {{expired}}
        </v-card-title>
        <v-card-text>
          <reauth v-if="expired"/>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" dark small color="pink accent-3" @click="login">
            <v-icon dark>
              mdi-login
            </v-icon>
            Reauthenticated
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main class="grey darken-4" dark>
      <v-container>
        <v-card elevation="18" class="rounded-xl" color="grey darken-3 mb-3 mx-auto" dark v-if="isAuth">
          <breadcrumb></breadcrumb>
        </v-card>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
    import Header from './components/Navbar.vue'
    import Breadcrumb from './components/Breadscrum.vue'
    import Reauth from './components/FormLogin.vue'
    export default {
        data: () => ({ drawer: null}),
        computed: {
            ...mapState(['expired']),
            ...mapGetters(['isAuth'])
        },
        components: {
            'app-navbar': Header,
            'breadcrumb': Breadcrumb,
            'reauth': Reauth,
        },
        methods: {
          ...mapActions('auth', ['relogin']),
          ...mapMutations(['CLEAR_ERRORS','SET_EXPIRED']),
          login() {
            this.relogin().then(() => {
                if (this.isAuth) {
                  this.CLEAR_ERRORS()
                  this.SET_EXPIRED(false)
                }
            })
          }
        }
    }
</script>
