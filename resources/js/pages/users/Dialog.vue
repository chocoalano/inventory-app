<template>
  <v-card class="grey darken-3 rounded-xl" dark>
    <v-toolbar dark color="grey darken-3">
      <v-toolbar-title>{{(id)?'Updated Users':'Add New Users'}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="updated(id)" v-if="id">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn dark text @click="created()" v-else>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-progress-linear indeterminate color="white" v-if="progress"></v-progress-linear>
    <v-container class="max-width">
      <form-data/>
    </v-container>
  </v-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Form from './Form.vue'
export default {
  components: {
      'form-data': Form
  },
  computed: {
      ...mapState('userscrud', {
          progress: state => state.progress_form,
          id: state => state.id
      })
  },
  methods: {
      ...mapActions('userscrud', ['Save','update']),
      created() {
        this.Save().then((e) => {
            this.$store.commit('userscrud/SET_DIALOG', false)
        })
      },
      updated(id) {
        this.update(id).then((e) => {
            this.$store.commit('userscrud/SET_DIALOG', false)
        })
      }
  }
}
</script>
