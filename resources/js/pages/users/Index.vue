<template>
  <div>
    <v-container>
      <breadcrumb></breadcrumb>
        <v-card>
          <v-card-title>
            <v-btn class="mx-2" fab dark small color="primary">
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="Users.data"
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
          >
          <template v-slot:item.id="{ item }">
            <v-row>
              <v-btn icon color="pink">
                <v-icon>mdi-delete-sweep </v-icon>
                <!-- {{ item.id }} -->
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon color="secondary">
                <v-icon>mdi-clipboard-edit  </v-icon>
                <!-- {{ item.id }} -->
              </v-btn>
            </v-row>
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
        </v-card>
      </v-container>
  </div>
</template>
<script type="text/javascript">
  import { mapActions, mapState } from 'vuex'
  import Breadcrumb from '../../components/Breadscrum.vue'
  export default{
    name: 'home',
    components: {
        'breadcrumb': Breadcrumb
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
              { text: 'Act', value: 'id' },
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
        deleteOutlet(id) {
            this.$swal({
                title: 'Kamu Yakin?',
                text: "Tindakan ini akan menghapus secara permanent!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                //JIKA DISETUJUI
                if (result.value) {
                    //MAKA FUNGSI removeOutlet AKAN DIJALANKAN
                    this.removeUsers(id)
                }
            })
        }
    }

  }
</script>
