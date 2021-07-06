<template>
    <section>
        <v-navigation-drawer v-model="drawer" color="grey darken-4" app dark>
          <v-list-item link>
            <v-list-item-avatar>
              <v-avatar color="indigo">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{authenticated.name}}
              </v-list-item-title>
              <v-list-item-subtitle>{{authenticated.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-container>
            <v-card class="rounded-xl" color="grey darken-3 mt-3 mx-auto">
              <v-container class="max-width">
                <v-list nav dense shaped>
                  <v-list-item-group v-model="selectedItem" color="white">
                    <v-list-item to="/">
                      <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <!-- menu -->
                    <v-list-group v-for="(item, i) in menu" :key="i" :value="false" :prepend-icon="item.icon" color="white">
                    <template v-slot:activator>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </template>
                    <v-list-item v-for="(sub, i) in item.extend" :key="i" :to="sub.link" v-if="$can(sub.authorization)">
                      <v-list-item-content>
                        <v-list-item-title>{{ sub.name }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-icon>{{ sub.icon }}</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    </v-list-group>
                    <!-- menu -->
                  </v-list-item-group>
                </v-list>
              </v-container>
            </v-card>
          </v-container>
        </v-navigation-drawer>
        <v-app-bar app color="grey darken-4" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <div class="flex-grow-1"></div>
            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-bell-ring</v-icon>
                </v-btn>
                </template>
                <!-- notif drawer -->
                <v-list two-line>
                  <v-list-item-group
                    v-model="selected"
                    active-class="pink--text"
                    multiple
                  >
                    <template v-for="(item, index) in items">
                      <v-list-item :key="item.title">
                        <template v-slot:default="{ active }">
                          <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>

                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item.headline"
                            ></v-list-item-subtitle>

                            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                            <v-icon
                              v-if="!active"
                              color="grey lighten-1"
                            >
                              mdi-star-outline
                            </v-icon>

                            <v-icon
                              v-else
                              color="yellow darken-3"
                            >
                              mdi-star
                            </v-icon>
                          </v-list-item-action>
                        </template>
                      </v-list-item>

                      <v-divider
                        v-if="index < items.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
                <!-- notif drawer -->
            </v-menu>
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
      mini: true,
      selected: [2],
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer',
        },
      ],
    }),
    computed: {
        ...mapState('auth', {
            loading: state => state.loading,
            menu: state => state.menu,
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
