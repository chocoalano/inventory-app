<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" :md="(form.type === 'sub-menu')? 4 : 6">
          <v-text-field v-model="form.name" label="Menu Name" />
        </v-col>
        <v-col cols="12" :md="(form.type === 'sub-menu')? 4 : 6">
          <v-select
            v-model="form.type"
            :items="type"
            item-text="name"
            item-value="value"
            label="Select Type"
          />
        </v-col>
        <v-col cols="12" :md="(form.type === 'sub-menu')? 4 : 6" v-if="form.type === 'sub-menu'">
          <v-select
            v-model="form.extend"
            :items="extend"
            item-text="name"
            item-value="id"
            label="Select Extend"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :md="(form.type === 'sub-menu')? 4 : 6">
          <v-text-field v-model="form.icon" label="Menu Icon" />
        </v-col>
        <v-col cols="12" md="4" :md="(form.type === 'sub-menu')? 4 : 6" v-if="form.type === 'sub-menu'">
          <v-text-field v-model="form.link" label="Menu Link" />
        </v-col>
        <v-col cols="12" :md="(form.type === 'sub-menu')? 4 : 6">
          <v-select
            v-model="form.authorization"
            :items="authorization"
            item-text="name"
            item-value="name"
            label="Select Authorization"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    created() {
        this.getmenu()
        this.getauthorization()
    },
    data: () => ({
      type: [
        {'name':'Main Menu','value':'main-menu'},
        {'name':'Sub Menu','value':'sub-menu'}
      ]
    }),
    computed: {
        ...mapState(['errors']),
        ...mapState('menuscrud', {
            authorization: state => state.authorization,
            extend: state => state.extend,
            form: state => state.form_menus,
        })
    },
    methods: {
        ...mapActions('menuscrud', ['getmenu','getauthorization'])
    }
  }
</script>
