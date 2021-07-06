<template>
  <v-card elevation="18" class="rounded-xl" color="grey darken-3 mt-3 mx-auto" dark>
    <v-card-text>
      <div>Serverside Menu Manage Datatable.</div>
    </v-card-text>
    <v-alert dense border="left" type="success" v-if="alert">
      {{alertmsg}}
    </v-alert>
    <v-progress-linear indeterminate color="white" v-if="progress_table"></v-progress-linear>
    <v-data-table
      v-model="selected_table"
      :headers="headers_table"
      :items="menusdata_table.data"
      :search="search_table"
      :page.sync="page_table"
      :items-per-page="perpage_table"
      hide-default-footer
      :single-select="singleSelect_table"
      item-key="id"
      show-select
      class="elevation-1"
    >
    <template v-slot:top>
      <v-switch v-model="singleSelect_table" label="Single select" class="pa-3"></v-switch>
      <v-toolbar flat>
        <v-btn class="mx-2" fab dark small color="red accent-3" @click="create()" v-if="$can('user-create')">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn class="mx-2" fab dark small color="red accent-3" v-if="selected_table.length > 0 && $can('user-delete')" @click="deleteAll()">
          <v-icon dark>
            mdi-delete
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search_table" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="Edit(item.id)" v-if="$can('menu-edit')">mdi-pencil</v-icon>
      <v-icon small @click="deleted(item.id)" v-if="$can('menu-delete')">mdi-delete</v-icon>
    </template>
    </v-data-table>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            v-model="page_table"
            class="my-4"
            color="red accent-3"
            :length="length_table"
            circle
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default{
  name: 'DataMenus',
  created() {
      this.Index()
  },
  computed: {
      ...mapState('menuscrud', {
          headers_table: state => state.headers_table,
          progress_table: state => state.progress_table,
          menusdata_table: state => state.menusdata_table,
          search_table: state => state.search_table,
          selected_table: state => state.selected_table,
          singleSelect_table: state => state.singleSelect_table,
          page_table: state => state.page_table,
          length_table: state => state.length_table,
          perpage_table: state => state.perpage_table,
          alert: state => state.alert,
          alertmsg: state => state.alertmsg,
      }),
      singleSelect_table:{
        get() {
            return this.$store.state.menuscrud.singleSelect_table
        },
        set(val) {
            this.$store.commit('menuscrud/ASSIGN_SINGLE_SELECTED_TABLE', val)
        }
      },
      selected_table:{
        get() {
            return this.$store.state.menuscrud.selected_table
        },
        set(val) {
            this.$store.commit('menuscrud/ASSIGN_SELECTED_TABLE', val)
        }
      },
      page_table: {
          get() {
              return this.$store.state.menuscrud.page_table
          },
          set(val) {
              this.$store.commit('menuscrud/ASSIGN_PAGE_TABLE', val)
          }
      },
      search_table: {
          get() {
              return this.$store.state.menuscrud.search_table
          },
          set(val) {
              this.$store.commit('menuscrud/ASSIGN_SEARCH_TABLE', val)
          }
      }
  },
  watch: {
      page_table() {
          this.Index()
      },
      search_table() {
          this.Index(this.search_table)
      }
  },
  methods: {
      ...mapActions('menuscrud', ['Index','remove','show','removeAll']),
      create() {
        this.$store.commit('menuscrud/SET_DIALOG', true)
      },
      Edit(id) {
        this.$store.commit('menuscrud/SET_DIALOG', true)
        this.show(id)
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
                this.remove(id)
            }
        })
      },
      deleteAll(){
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
                this.removeAll()
            }
        })
      }
  }
}
</script>
