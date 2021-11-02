<template>
  <v-app>
      <v-main>
      <CardsTable/>
    </v-main>
  </v-app>
</template>

<script>
import CardsTable from './components/CardsTable';

export default {
  name: 'App',

  components: {
    CardsTable,
  },

  data: () => ({
    //
  }),
};
</script>
