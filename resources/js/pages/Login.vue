<template>
  <v-app>
    <v-container fluid fill-height class="pink accent-3">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img src="http://localhost:8000/storage/img/diamond.png" alt="Vue Material Admin" width="180" height="180">
                <h1 class="flex my-4 primary--text">Vue Admin Template</h1>
              </div>
              <v-form>
                <v-text-field
                  append-icon="mdi-account-circle"
                  name="login"
                  label="Login"
                  type="text"
                  v-model="data.email"
                  :error="error"
                  :rules="[rules.required]"/>
                <v-text-field
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                  name="password"
                  label="Password"
                  id="password"
                  :rules="[rules.required]"
                  v-model="data.password"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="showResult"
      :timeout="2000"
      top>
      {{ result }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      data: {
                email: '',
                password: ''
            },
      loading: false,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  created() {
      if (this.isAuth) {
          this.$router.push({ name: 'home' })
      }
  },
  computed: {
      ...mapGetters(['isAuth']),
    	...mapState(['errors'])
  },

  methods: {
    ...mapActions('auth', ['submit']),
    ...mapMutations(['CLEAR_ERRORS']),
    login() {
      this.submit(this.data).then(() => {
          if (this.isAuth) {
              this.CLEAR_ERRORS()
              this.$router.push({ name: 'home' })
          }
      })
    }
  }
}
</script>
