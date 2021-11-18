<template>
<div id="rickAndMorty">
  <Search></Search>
  <v-btn @click="allCharacters">All Characters</v-btn>
    <v-btn @click="favorites">Favorites</v-btn>
    <div v-if="allCharacter" class="">
      <AllTable></AllTable>
    </div>
    <div v-if="favorite" class="">
      <FavoritesTable></FavoritesTable>
    </div>
</div>

  
</template>

<script>
import AllTable from './AllTable.vue';
import FavoritesTable from './FavoritesTable.vue';
import Search from './Search.vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import * as types from '@/store/types';


  export default {
    
    data: () => ({
     allCharacter: true,
      favorite: false
     
    }),
     components: {
    AllTable,
    FavoritesTable,
    Search
   
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
    // pagesLength(){
    //   return this.info?.pages;
    // },
  },
  methods: {
    ...mapActions ({
      getCharacters: types.GET_CHARACTERS,
    }),
    ...mapMutations ({
      setFavorite: types.SET_FAVORITE,
    }),
    addToFavorite(item){
      this.setFavorite(item);
      // console.log(this.charactersResult)
      console.log("1111", item);
    },
  allCharacters(){
    console.log(this.allCharacter);
      this.allCharacter = true;
      this.favorite = false;
    },
    favorites(){
      console.log(this.favorite);
      console.log(this.arrFavorites);
      this.favorite = true;
      this.allCharacter = false;

    }
  },
    mounted(){
    this.getCharacters(this.id);
  }
  }
</script>
<style>
#rickAndMorty {
  color: #a9b1bd;
  font-weight: 300;
  font-size: 16px;
}

</style>
