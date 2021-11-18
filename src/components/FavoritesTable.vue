<template>
<div>
  <v-data-table
      :headers="headers"
      :items-per-page="sizeTable"
      class="elevation-1"
      :items="arrFavoritesCurrent"
      hide-default-footer
      disable-sort
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
                <div>
                  <v-icon v-if="item.gender === 'Female'"> {{ mdiGenderFemale }}</v-icon>
                  <v-icon v-if="item.gender === 'Male'">{{ mdiGenderMale }}</v-icon>
                  {{ item.gender }}
                </div>
              </td>
              <td>
                <div>{{ item.species }}</div>
              </td>
              <td>
                <div>{{ item.episodeCode }}</div>
              </td>
              <td>
                <v-btn @click="deleteFromFavorite(item)" 
                        class="btn-unclick" 
                        height=43 
                        min-width=43>
                  <v-icon color="white">{{ mdiStar }}</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="arrCurrentPage"
        :length="arrPagesLength"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import * as types from '@/store/types';
import { mdiGenderFemale,  mdiGenderMale, mdiStar} from '@mdi/js'; 

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
      },
        mdiGenderMale: mdiGenderMale,
        mdiGenderFemale: mdiGenderFemale,
        mdiStar: mdiStar, 
    }),
    computed: {
      ...mapGetters ({
        charactersResults: types.CHARACTERS,
        info: types.INFO,
        arrFavorites: types.GET_FAVORITE,
        arrFavoritesCurrent: types.GET_FAVORITE_CURRENT,
        getArrCurrentPage:types.GET_ARR_CURRENT_PAGE,
        sizeTable:types.SIZE_TABLE 
      }),
      arrPagesLength(){
        console.log("length", Math.ceil(this.arrFavorites.length / this.sizeTable))
        return Math.ceil(this.arrFavorites.length / this.sizeTable);
      },
      arrCurrentPage: {
      get() {
        return this.getArrCurrentPage; 
      },
      set(currentPage) {
        this.setFavoriteCurrent(currentPage);
      },
    },
  },
  methods: {
    ...mapActions ({
      getCharacters: types.GET_CHARACTERS,
      setCurrentPage: types.SET_CURRENT_PAGE,
    }),
    ...mapMutations ({
      deleteFavorite: types.DELETE_FAVORITE,
      setFavoriteCurrent: types.SET_FAVORITE_CURRENT
    }),
    deleteFromFavorite(item){
      this.deleteFavorite(item);
    },
  },
  mounted(){
    this.setFavoriteCurrent(1)
  }
    
  }
</script>
<style scoped lang="scss">

</style>
