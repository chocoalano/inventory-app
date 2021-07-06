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
      ...mapState('userscrud', {
          dialog: state => state.dialog
      }),
      dialog: {
          get() {
              return this.$store.state.userscrud.dialog
          },
          set(val) {
              this.$store.commit('userscrud/SET_DIALOG', val)
          }
      },
  },
  watch: {
      dialog() {
        this.$store.commit('userscrud/CLEAR_ID')
        this.$store.commit('userscrud/CLEAR_FORM')
      }
  }
}
</script>
