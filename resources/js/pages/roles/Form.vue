<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form_roles.name"
            label="Roles Name"
            required >
          </v-text-field>
        </v-col>
      </v-row>
      <v-simple-table dark class="mt-5">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Permission
              </th>
              <th class="text-left">
                Access
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in permission"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>
                <v-switch
                  v-model="form_roles.permission"
                  color="red accent-3"
                  :value="item.id"
                  hide-details
                >
                </v-switch>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="text-center mt-5">
        <v-pagination
          v-model="p_page"
          :length="p_length"
          :total-visible="p_total"
          circle
        ></v-pagination>
      </div>
    </v-container>
  </v-form>
</template>
<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  export default {
    created() {
        this.getPermission()
    },
    computed: {
        ...mapState(['errors']),
        ...mapState('rolescrud', {
            roles_name: state => state.roles_name,
            permission: state => state.permission,
            form_roles: state => state.form_roles,
            p_page: state => state.p_page,
            p_length: state => state.p_length,
            p_total: state => state.p_total,
        }),
        p_page: {
            get() {
                return this.$store.state.rolescrud.p_page
            },
            set(val) {
                this.$store.commit('rolescrud/SET_PAGE_P_PAGE', val)
            }
        },
        form_roles: {
            get() {
                return this.$store.state.rolescrud.form_roles
            },
            set(val) {
                this.$store.commit('rolescrud/ASSIGN_FORM', val)
            }
        }
    },
    watch: {
        p_page() {
            this.getPermission()
        }
    },
    methods: {
        ...mapActions('rolescrud', ['getPermission'])
    }
  }
</script>
