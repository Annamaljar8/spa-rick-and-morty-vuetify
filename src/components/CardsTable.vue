<template>
  <div id="rickAndMorty">
    <Search></Search>
    <v-card>
      <div id="activeMode">
        <v-tabs
          v-model="tab"
          background-color="white"
          color="#11B0C8"
          
        >
          <v-tab
            v-for="item in items"
            :key="item.tab"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </div>
      <v-tabs-items v-model="tab">
        <v-tab-item
            v-for="item in items"
            :key="item.tab"
          >
          <v-card flat>
            <v-card-text>{{ item.content }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <div v-if="allCharacter" class="text-color">
        <AllTable></AllTable>
      </div>
      <div v-if="favorite" class="text-color">
        <FavoritesTable></FavoritesTable>
      </div>
    </v-card>
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
      items: [
        {  tab: 'All Characters' }, 
        {  tab: 'Favorites' }
      ],
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
   tab: {
      get(valElement) {
        
      },
      set(valElement) {
        if(valElement == 0){
          this.allCharacters();
        } else {
          this.favorites()
        }
      },
    },
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
    },
    allCharacters(){
      this.allCharacter = true;
      this.favorite = false;
    },
    favorites(){
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

#rickAndMorty {
  font-weight: 500;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
}
#rickAndMorty .v-tabs-bar{
  height: 2rem!important;
  padding-left: 7rem;
}
.text-color{
  color: #a9b1bd!important;
}
#rickAndMorty .v-tab{
  text-transform: none;
  letter-spacing: normal;
  font-size: 16px;
}
#activeMode{
  height: 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
#activeMode .v-tabs-slider{
  width: 80%;
  margin-left: 10%;
}
#activeMode .theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active){
  color: #a9b1bd;
}
</style>
