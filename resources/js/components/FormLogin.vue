<template>
  <v-form>
    <v-text-field
      append-icon="mdi-account-circle"
      name="login"
      type="text"
      v-model="data.email"
      :error="error"
      :rules="[rules.required]"
      />
    <v-text-field
      :type="hidePassword ? 'password' : 'text'"
      :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
      name="password"
      id="password"
      :rules="[rules.required]"
      v-model="data.password"
      :error="error"
      @click:append="hidePassword = !hidePassword"/>
  </v-form>
</template>
<script>
import { mapState } from 'vuex'
export default{
  data() {
    return {
      hidePassword: true,
      error: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed:{
    ...mapState('auth', {
        data: state => state.data
    }),
  },
}
</script>
