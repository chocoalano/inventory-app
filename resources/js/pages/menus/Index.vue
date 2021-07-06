<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <dialog-app />
    </v-dialog>
    <table-app />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Dialog from './Dialog.vue'
import Table from './Table.vue'
export default{
  components: {
      'dialog-app': Dialog,
      'table-app': Table,
  },
  computed: {
      ...mapState('menuscrud', {
          dialog: state => state.dialog
      }),
      dialog: {
          get() {
              return this.$store.state.menuscrud.dialog
          },
          set(val) {
              this.$store.commit('menuscrud/SET_DIALOG', val)
          }
      },
  },
  watch: {
      dialog() {
        this.$store.commit('menuscrud/CLEAR_ID')
        this.$store.commit('menuscrud/CLEAR_FORM')
      }
  }
}
</script>
