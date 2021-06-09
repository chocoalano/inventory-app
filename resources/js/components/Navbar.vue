<template>
    <section>
        <v-navigation-drawer v-model="drawer" app>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="title">
                Application Name
            </v-list-item-title>
            <v-list-item-subtitle>
                subtext
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <v-list-item to="/Home">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item  to="/About">
                <v-list-item-action>
                    <v-icon>mdi-help-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>About</v-list-item-title>
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
                <v-btn @click="signoutButtonPressed" color="red darken-4 white--text" block>Logout</v-btn>
            </div>
        </template>
        </v-navigation-drawer>

        <v-app-bar app color="blue darken-4" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
            <div class="flex-grow-1"></div>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
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
  props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
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
