<template>
    <section>
        <v-navigation-drawer v-model="drawer" app>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="title">
                App Inventory
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">
                {{user.email}}
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <v-list-item to="/">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item  to="/users">
                <v-list-item-action>
                    <v-icon>mdi-account-box-multiple</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Users Manage</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense nav>
            <v-list-item  to="/Messages">
                <v-list-item-action>
                    <v-badge>
                        <template v-slot:badge>0</template>
                        <v-icon>mdi-email</v-icon>
                    </v-badge>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Messages</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn @click="signoutButtonPressed" color="red darken-4 white--text" block :loading="loading">Logout</v-btn>
            </div>
        </template>
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
