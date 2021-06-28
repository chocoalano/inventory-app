<template>
  <div>
    <!-- modal dialog started -->
    <v-dialog v-model="dialogcreate" width="500">
      <add-form></add-form>
    </v-dialog>
    <v-dialog v-model="dialogedit" width="500">
      <edit-form></edit-form>
    </v-dialog>
    <!-- modal dialog ended-->
    <v-card elevation="18" class="rounded-xl" color="grey darken-3 mt-3 mx-auto" dark>
      <v-card-text>
        <div>Serverside Roles & Permission Datatable.</div>
      </v-card-text>
      <v-alert dense border="left" type="success" v-if="alert">
        {{alertmsg}}
      </v-alert>
      <v-progress-linear indeterminate color="white" v-if="progress"></v-progress-linear>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="rolesdata.data"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :single-select="singleSelect"
        item-key="id"
        show-select
        class="elevation-1"
      >
      <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
        <v-toolbar flat>
          <v-btn class="mx-2" fab dark small color="red accent-3" @click="create()" v-if="$can('user-create')">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn class="mx-2" fab dark small color="red accent-3" v-if="selected.length > 0 && $can('user-delete')" @click="deleteAll()">
            <v-icon dark>
              mdi-delete
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="edit(item.id)" v-if="$can('user-edit')">mdi-pencil</v-icon>
        <v-icon small @click="deleted(item.id)" v-if="$can('user-delete')">mdi-delete</v-icon>
      </template>
      </v-data-table>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              color="red accent-3"
              :length="pageLength"
              circle
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script type="text/javascript">
  import { mapActions, mapState } from 'vuex'
  import Add from './Add.vue'
  import Edit from './Edit.vue'
  export default{
    name: 'home',
    components: {
        'add-form': Add,
        'edit-form': Edit,
    },
    name: 'DataRoles',
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
              { text: 'Created', value: 'created_at' },
              { text: 'Updated', value: 'updated_at' },
              { text: 'Actions', value: 'actions', sortable: false },
            ],
            search: '',
            singleSelect: false,
            selected: [],
        }
    },
    computed: {
        ...mapState('rolescrud', {
            progress: state => state.progress_table,
            rolesdata: state => state.rolesdata,
            itemsPerPage: state => state.itemsPerPage,
            pageCount: state => state.pageCount,
            pageLength: state => state.pageLength,
            alert: state => state.alert,
            alertmsg: state => state.alertmsg,
            dialogcreate: state => state.dialogcreate,
            dialogedit: state => state.dialogedit,
        }),
        page: {
            get() {
                return this.$store.state.rolescrud.page
            },
            set(val) {
                this.$store.commit('rolescrud/SET_PAGE', val)
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
        ...mapActions('rolescrud', ['getUsers', 'removeUsers','removeUsersAll','editUsers']),
        create() {
            this.$store.commit('rolescrud/SET_DIALOG_CREATE', true)
        },
        edit(id) {
            this.$store.commit('rolescrud/SET_DIALOG_EDIT', true)
            this.$store.commit('rolescrud/SET_ID', id)
            this.editUsers(id)
        },
        deleted(id) {
          this.$swal({
              title: 'Kamu Yakin?',
              text: "Tindakan ini akan menghapus secara permanent!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Iya, Lanjutkan!'
          }).then((result) => {
              if (result.value) {
                  this.removeUsers(id)
              }
          })
        },
        deleteAll(){
          this.removeUsersAll(this.selected)
        }
    }

  }
</script>
