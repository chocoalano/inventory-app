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
          <v-toolbar-title>Machine Learning Desicion Tree For Prediction Created Tools</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="CloseDialog()">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Use data from .xlsx file here.</v-list-item-title>
              <v-list-item-subtitle>
                <v-file-input
                  show-size
                  counter
                  multiple
                  label=".xlsx file input formated"
                  accept=".xls,.xlsx"
                  @change="readExcel()"
                ></v-file-input>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Data Loaded</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
        ...mapState('home', {
        fulldialog: state => state.fulldialog
      })
    },
    methods: {
      CloseDialog(){
        this.$store.commit('home/SET_DIALOG', false)
      },
      readExcel(e){
        const files = e.target.files;
        const fileReader = new FileReader();
        fileReader.onload = ev =>{
          const data = ev.target.result;
          const workbook = Xlsx.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0];
          const ws = Xlsx.utils.sheet_to_json(workbook.Sheets[wsname]);
          ws.forEach((value, index, ws)=>{
            console.log(value)
          })
        };
        fileReader.readAsBinaryString(files[0]);
      }
    }
  }
</script>
