<template>
  <div>
    <full-dialog />
    <card-home />
  </div>
</template>
<script type="text/javascript">
  import { mapGetters, mapState } from 'vuex';
  import CardHome from './CardHome.vue'
  import FullDialog from './FullDialog.vue'
  export default{
    name: 'home',
    components: {
        'card-home': CardHome,
        'full-dialog': FullDialog,
    },
    computed: {
        ...mapState(['baseUrl']),
        ...mapGetters(['isAuth']),
      	...mapState(['errors'])
    }
  }
</script>
