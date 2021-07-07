<template>
  <v-row justify="center">
    <v-dialog
      v-model="fulldialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="grey darken-4" dark>
          <v-btn icon dark @click="CloseDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            Machine Learning Tools
          </v-toolbar-title>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex justify-center mb-6">
                <v-alert
                  color="#C51162"
                  dark
                  icon="mdi-vuetify"
                  border="left"
                  prominent
                  dismissible
                >
                  Untuk menganalisis data, penting untuk mengetahui jenis data apa yang kita hadapi. Kita dapat membagi tipe data menjadi tiga kategori utama yaitu <b>numerik</b>, <b>kategoris</b>, <b>Urut</b>.
                </v-alert>
              </div>
              <v-list-item-title>Gunakan data dari file .xlsx di sini</v-list-item-title>
              <v-list-item-subtitle>
                <v-file-input
                  show-size
                  counter
                  multiple
                  label="input file dengan format .xlsx"
                  accept=".xls,.xlsx"
                  @change="readExcel()"
                />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <div>
          {{ xlsx }}
        </div>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="mb-3">
                Dengan mengetahui tipe data sumber data Anda, Anda akan dapat mengetahui teknik apa yang digunakan saat menganalisisnya.
              </v-list-item-title>
              <accordion-home />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import { mapState } from 'vuex';
  import Accordion from './accordion.vue'
  export default {
    components: {
        'accordion-home': Accordion,
    },
    computed: {
        ...mapState('home', {
        fulldialog: state => state.fulldialog,
        xlsx: state => state.xlsx,
      })
    },
    methods: {
      CloseDialog(){
        this.$store.commit('home/SET_DIALOG', false)
      },
      readExcel(e){
        this.$store.commit('home/SET_DATA_XLSX', e.target.files)
      }
    }
  }
</script>
