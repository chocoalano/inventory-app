<template>
  <div>
    <v-container>
      <breadcrumb></breadcrumb>
        <v-data-table
          :headers="headers"
          :items="Users.data"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
        >
        <template v-slot:top>
          <v-toolbar
            flat
          >
          <v-dialog v-model="dialogcreate">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-2" fab dark small color="primary" v-bind="attrs" v-on="on">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
            <add-form></add-form>
          </v-dialog>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <!-- <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="deleted(item.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="edit(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>

        </v-data-table>
        <v-row justify="center" v-if="Users.data && pageLength > 0">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="pageLength"
                circle
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>
<script type="text/javascript">
  import { mapActions, mapState } from 'vuex'
  import Breadcrumb from '../../components/Breadscrum.vue'
  import Add from './Add.vue'
  export default{
    name: 'home',
    components: {
        'breadcrumb': Breadcrumb,
        'add-form': Add
    },
    name: 'DataOutlet',
    created() {
        this.getUsers()
    },
    data() {
        return {
            headers: [
              {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'name',
              },
              { text: 'Email', value: 'email' },
              { text: 'Actions', value: 'actions', sortable: false },
            ],
            search: ''
        }
    },
    computed: {
        ...mapState('userscrud', {
            Users: state => state.userdata,
            itemsPerPage: state => state.itemsPerPage,
            pageCount: state => state.pageCount,
            pageLength: state => state.pageLength
        }),
        page: {
            get() {
                return this.$store.state.userscrud.page
            },
            set(val) {
                this.$store.commit('userscrud/SET_PAGE', val)
            }
        },
        dialogcreate: {
            get() {
                return this.$store.state.userscrud.dialogcreate
            },
            set(val) {
                this.$store.commit('userscrud/SET_DIALOG_CREATE', val)
            }
        }
    },
    watch: {
        page() {
            this.getUsers()
        },
        search() {
            this.getUsers(this.search)
        }
    },
    methods: {
        ...mapActions('userscrud', ['getUsers', 'removeUsers']),
        edit(id) {
            // this.$router.push({ name: 'users.edit', params: {id: id} })
            alert(id);
        }
        ,deleted(id) {
            alert(id);
        }
    }

  }
</script>
