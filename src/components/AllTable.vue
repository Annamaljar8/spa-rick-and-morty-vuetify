<template>
  <div>
    <v-data-table
    :headers="headers"
    :items-per-page="20"
    class="elevation-1"
    :items="charactersResults"
    hide-default-footer
  >
      <template v-slot:body="{items}">
        <tbody>
          <tr v-for="(item,index) in items" :key="index">
            <td class="card-img">
              <img :src="item.image"/>
            </td>
            <td>
              <div>{{ item.id }}</div>
            </td>
            <td>
              <div>{{ item.name }}</div>
            </td>
            <td>
              <div>{{ item.gender }}</div>
            </td>
            <td>
              <div>{{ item.species }}</div>
            </td>
            <td>
              <div>{{ lastEpisode(item.episode)  }} </div>
            </td>
            <td>
              <v-btn @click="addToFavorite(item)">Add to favorite</v-btn>
            </td>
          </tr>
        </tbody>
      </template>

  </v-data-table>
     <div class="text-center pt-2">
      <v-pagination
         v-model="currentPage"
        :length="pagesLength"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import * as types from '@/store/types';
// import Card from './Card.vue';

  export default {
    
    data: () => ({
      headers: [
        {
          text: 'Photo',
          value: '',
        },
        {
          text: 'Character ID',
          value: '',
        },
        {
          text: 'Name',
          value: '',
        },
        {
          text: 'Gender',
          value: '',
        },
        {
          text: 'Species',
          value: '',
        },
        {
          text: 'Last Episode',
          value: '',
        },
         {
          text: 'Add To Favorites',
          value: '',
        },
      ],
     charactersResult: {

        image: '',
        id: '',
        name: '',
        gender: '',
        species: '',
        episode: []
       
     },
    //  currentPage: 1
       
     
    }),
     components: {
    // Card,
   
  },
    computed: {
    ...mapGetters ({
      charactersResults: types.CHARACTERS,
      info: types.INFO,
      arrFavorites: types.GET_FAVORITE,
      getLastEpisode: types.GET_LAST_EPISODE,
      getCurrentPage:types.GET_CURRENT_PAGE
    }),
 
    pagesLength(){
      return this.info?.pages;
    },
    currentPage: {
      get() {
        return this.getCurrentPage; 
      },
      set(currentPage) {
        this.setCurrentPage(currentPage);
      },
    },
  },
  methods: {
    ...mapActions ({
      getCharacters: types.GET_CHARACTERS,
      setCurrentPage: types.SET_CURRENT_PAGE,
      setLastEpisode: types.SET_LAST_EPISODE
    }),
    ...mapMutations ({
      setFavorite: types.SET_FAVORITE,
    }),
    addToFavorite(item){
      this.setFavorite(item);
    },
     lastEpisode(item) {
       console.log(item)
      var url = item[item.length - 1];
      this.setLastEpisode(url);
      // return this.getLastEpisode;
    },
  },
  }
</script>
<style scoped lang="scss">
.card{
  width: 90vw;
  height: 3rem;
      display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: stretch;
    justify-content: flex-start;
    align-items: center;
}
img{
  width: 2.688rem!important;
  height: 4.25rem!important;
  object-fit: cover;
}
</style>
