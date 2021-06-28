<template>
    <section>
        <v-navigation-drawer v-model="drawer" color="grey darken-4" app dark>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{authenticated.name}}
                </v-list-item-title>
                <v-list-item-subtitle>{{authenticated.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          <v-list nav dense>
            <v-list-item-group
              v-model="selectedItem"
              color="white"
            >
              <v-list-item to="/">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/users" v-if="$can('user-list')">
                <v-list-item-icon>
                  <v-icon>mdi-account-box-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Users Manage</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/roles" v-if="$can('role-list')">
                <v-list-item-icon>
                  <v-icon>mdi-key-chain-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Roles & Pemission Manage</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="grey darken-4" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <div class="flex-grow-1"></div>
            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list>
                    <v-list-item  to="/Profile">
                        <v-list-item-action>
                            <v-icon>mdi-account-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  to="/Setting">
                        <v-list-item-action>
                            <v-icon>mdi-wrench</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Setting</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  @click="signoutButtonPressed">
                        <v-list-item-action>
                            <v-icon>mdi-logout-variant</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </section>
</template>
<script>
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
export default {
  props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      selectedItem: 0,
    }),
    computed: {
        ...mapState('auth', {
            loading: state => state.loading,
            authenticated: state => state.authenticated
        }),
        ...mapGetters(['isAuth']),
      	...mapState(['errors'])
    },
    methods: {
      ...mapActions('auth', ['logout']),
      ...mapMutations(['CLEAR_ERRORS']),
        signoutButtonPressed() {
          this.logout().then((e) => {
            this.$router.push({ name: 'login' })
          })
        }
    }
};
</script>
