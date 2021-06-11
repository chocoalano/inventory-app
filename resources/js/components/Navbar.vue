<template>
    <section>
        <v-navigation-drawer v-model="drawer" app>
          <v-list>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{user.name}}
                </v-list-item-title>
                <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list nav dense>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item to="/">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/users">
                <v-list-item-icon>
                  <v-icon>mdi-account-box-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Users Manage</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="blue darken-4" dark>
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
                </v-list>
            </v-menu>
        </v-app-bar>
    </section>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
export default {
  created() {
        this.user_auth()
    },
  props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      selectedItem: 0,
      items: [
        { text: 'Home', icon: 'mdi-home', link:'/' },
        { text: 'Users Manage', icon: 'mdi-account-box-multiple', link:'/users' }
      ],
    }),
    computed: {
        ...mapState('auth', {
            loading: state => state.loading,
            user: state => state.user
        }),
        ...mapGetters(['isAuth']),
      	...mapState(['errors'])
    },
    methods: {
      ...mapActions('auth', ['logout','user_auth']),
      ...mapMutations(['CLEAR_ERRORS']),
        signoutButtonPressed() {
          this.logout().then((e) => {
            this.$router.push({ name: 'login' })
          })
        }
    }
};
</script>
