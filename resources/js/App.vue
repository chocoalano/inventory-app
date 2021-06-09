<template>
    <v-app id="inspire">
      <app-navbar v-if="isAuth" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
    import { mapState, mapGetters } from 'vuex'
    import Header from './components/Navbar.vue'
    // import Footer from './components/Footer.vue'
    export default {
        data: () => ({ drawer: null }),
        computed: {
            ...mapState(['token']),
            ...mapGetters(['isAuth'])
        },
        components: {
            'app-navbar': Header,
        }
    }
</script>
