<template>

<v-data-table
    :headers="headers"
    :items-per-page="5"
    class="elevation-1"
    :items="arrFavorites"
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
              <div>{{ item.episode.length }}</div>
            </td>
            <td>
              <v-btn @click="deleteFromFavorite(item)">Delete from favorite</v-btn>
            </td>
          </tr>
        </tbody>
      </template>

  </v-data-table>
  
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
     arrFavorite: {

        image: '',
        id: '',
        name: '',
        gender: '',
        species: '',
        episode: []
       
     }
       
     
    }),
     components: {
    // Card,
   
  },
    computed: {
    ...mapGetters ({
      charactersResults: types.CHARACTERS,
      info: types.INFO,
      currentPage: types.GET_CURRENT_PAGE,
      arrFavorites: types.GET_FAVORITE,
    }),
  lastEpisode() {
      return this.charactersResult.episode[this.charactersResult.episode.length - 1] || ''
    },
    pagesLength(){
      return this.info?.pages;
    },
  },
  methods: {
    ...mapActions ({
      getCharacters: types.GET_CHARACTERS,
    }),
    ...mapMutations ({
       deleteFavorite: types.DELETE_FAVORITE,
    }),
     deleteFromFavorite(item){
      this.deleteFavorite(item);
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
