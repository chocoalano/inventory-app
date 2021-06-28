<template>
  <v-card class="grey darken-3 rounded-xl" dark>
    <v-toolbar dark color="grey darken-3">
      <v-btn icon dark @click="createdClose()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Add New Users</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="created()">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-progress-linear indeterminate color="white" v-if="progress"></v-progress-linear>
    <v-container class="max-width">
      <form-user></form-user>
    </v-container>
  </v-card>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import Form from './Form.vue'
  export default {
    components: {
        'form-user': Form
    },
    computed: {
        ...mapState('userscrud', {
            dialogcreate: state => state.dialogcreate,
            progress: state => state.progress
        })
    },
    methods: {
        ...mapActions('userscrud', ['submitUsers']),
        created() {
          this.submitUsers().then((e) => {
              this.$store.commit('userscrud/SET_DIALOG_CREATE', false)
          })
        },
        createdClose() {
          this.$store.commit('userscrud/SET_DIALOG_CREATE', false)
        }
    }
  }
</script>
