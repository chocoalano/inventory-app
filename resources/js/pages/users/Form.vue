<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="users.name" :rules="nameRules" :counter="10" label="Full Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="users.email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="users.roles"
            :items="roles"
            item-text="name"
            item-value="id"
            label="Select Roles"
            :rules="[v => !!v || 'Item is required']"
            required
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
    data: () => ({
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    created() {
        this.getRoles()
    },
    computed: {
        ...mapState(['errors']),
        ...mapState('userscrud', {
            users: state => state.user,
            roles: state => state.roles,
        })
    },
    methods: {
        ...mapActions('userscrud', ['getRoles'])
    }
  }
</script>
