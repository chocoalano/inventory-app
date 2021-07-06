<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="form.name" label="Full Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="form.email" label="E-mail"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="form.roles"
            :items="roles"
            item-text="name"
            item-value="id"
            label="Select Roles"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  export default {
    created() {
        this.getroles()
    },
    computed: {
        ...mapState(['errors']),
        ...mapState('userscrud', {
            form: state => state.form,
            roles: state => state.roles,
        })
    },
    methods: {
        ...mapActions('userscrud', ['getroles'])
    }
  }
</script>
