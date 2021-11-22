<template>
  <div>
    <v-data-table
    :headers="headers"
    :items-per-page="sizeTable"
    :items="charactersResults"
    hide-default-footer
    disable-sort
    color="#a9b1bd"
  >
      <template v-slot:body="{items}">
        <tbody>
          <tr v-for="(item,index) in items" :key="index">
            <td>
              <div></div>
            </td>
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
              <div class="icons-color">
                <v-icon v-if="item.gender === 'Female'"> {{ mdiGenderFemale }}</v-icon>
                <v-icon v-if="item.gender === 'Male'">{{ mdiGenderMale }}</v-icon>
                <v-icon v-if="item.gender === 'Genderless'">{{ mdiClose }}</v-icon>
                <v-icon v-if="item.gender === 'unknown'">{{ mdiMinus }}</v-icon>
                {{ item.gender }}
              </div>
            </td>
            <td>
              <div>{{ item.species }}</div>
            </td>
            <td>
              <div>{{ item.episodeCode }} </div>
            </td>
            <td>
              <v-btn v-if="!checkItem(item)" @click="addToFavorite(item)" class="btn-click" height=43 min-width=43><v-icon color="#11B0C8">{{ mdiStar }}</v-icon></v-btn>
              <v-btn v-if="checkItem(item)" @click="deleteFromFavorite(item)" class="btn-unclick" height=43 min-width=43><v-icon color="white">{{ mdiStar }}</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination 
        color="#11B0C8"
        v-model="currentPage"
        :length="pagesLength"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import * as types from '@/store/types'; 
import { mdiGenderFemale,  mdiGenderMale, mdiClose, mdiMinus, mdiStar} from '@mdi/js'; 

export default {
  
  data: () => ({
    headers: [
      {
        text: '',
        value: '',
      },
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
    mdiGenderMale: mdiGenderMale,
    mdiGenderFemale: mdiGenderFemale,
    mdiClose: mdiClose,
    mdiMinus: mdiMinus,
    mdiStar: mdiStar
  }),
  computed: {
    ...mapGetters ({
      charactersResults: types.CHARACTERS,
      info: types.INFO,
      arrFavorites: types.GET_FAVORITE,
      getCurrentPage:types.GET_CURRENT_PAGE,
      sizeTable:types.SIZE_TABLE 
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
    }),
    ...mapMutations ({
      setFavorite: types.SET_FAVORITE,
      deleteFavorite: types.DELETE_FAVORITE,
    }),
    addToFavorite(item){
      this.setFavorite(item);
    }, 
    deleteFromFavorite(item){
      this.deleteFavorite(item);
    },
    checkItem(item){
      for(let i = 0; i < this.arrFavorites.length; i++){
        let arr =  this.arrFavorites[i];
        if(arr.id == item.id){
          return true;
        } 
      }
      return false;
    }
  },
}
</script>

<style>
/* .card{
  width: 90vw;
  height: 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: stretch;
  justify-content: flex-start;
  align-items: center;
} */
.card-img img{
  width: 2.688rem!important;
  height: 4.25rem!important;
  object-fit: cover;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th{
  height: 54px!important;
  background-color: rgba(229,234,244,.25)!important;
  color: #a9b1bd!important;
  font-weight: 400;
  font-size: 16px;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
  color: #a9b1bd;
  font-weight: 400;
  font-size: 16px;
}
.theme--light.v-btn.btn-click{
  border:2px solid #11B0C8;
  border-radius: 8px;
  background-color: white;
  padding: 0!important;
}
.theme--light.v-btn.btn-unclick{
  border:2px solid #11B0C8;
  border-radius: 8px;
  background-color: #11B0C8!important;
  padding: 0!important;
}
.theme--light .icons-color .v-icon{
  color: #a9b1bd;
}
#rickAndMorty .theme--light.v-pagination .v-pagination__item{
  color: #a9b1bd;
}
#rickAndMorty .theme--light.v-pagination .v-pagination__item--active{
  color: white;
}
</style>
