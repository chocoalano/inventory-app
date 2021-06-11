<template>
  <v-card>
    <v-toolbar
      dark
      color="primary"
    >
      <v-btn icon dark @click="created()">
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
            dialogcreate: state => state.dialogcreate
        })
    },
    methods: {
        ...mapActions('userscrud', ['getUsers', 'removeUsers']),
        created() {
            this.$store.commit('userscrud/SET_DIALOG_CREATE', false)
        }
    }
  }
</script>
