<template>
  <div id="searchWrapper">
    <img src="../assets/logo.svg" alt="" width="240">
    <div class="search" >
    <span class="text">
      Search by
    </span>
    <v-autocomplete
          :items="items"
          hide-details
          label="Name"
          solo
          class="select"
           @change="handleChange"
        >
        <template v-slot:item="{ item }" >
          <v-list-item-content>
            <v-list-item-title v-text="item" ></v-list-item-title>
          </v-list-item-content>
        </template>
    </v-autocomplete>
    <div class="search-input-wrapper">
      <input shaped class="search-input" @change="filterValue">
      <v-icon  role="img" aria-hidden="false" color="#11B0C8" large>
        {{ mdiMagnify }}
      </v-icon>
    </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as types from '@/store/types';
import { mdiMagnify } from '@mdi/js'; 

export default({
  data () {
    return {
      items: [
        'Name',
        'ID',
        'Episode',
      ],
      typeOfFilter: '',
      mdiMagnify: mdiMagnify
    }
  },
  methods: {
    ...mapActions({
      searchByName: types.SEARCH_BY_NAME,
      searchById: types.SEARCH_BY_ID,
      searchByEpisode: types.SEARCH_BY_EPISODE,
    }),
    handleChange(value){
      this.typeOfFilter = value.toLowerCase();
      console.log('this.typeOfFilter', this.typeOfFilter)
    },
    filterValue(e){
      let inputValue = e.target.value;
      switch (this.typeOfFilter) {
        case 'name':
          console.log('name inputValue', inputValue)
          return this.searchByName(inputValue.toLowerCase());

        case 'id':
          return this.searchById(inputValue.toLowerCase());

        case 'episode':
          return this.searchByEpisode(inputValue);

        default:
          return '';
      }
    }
  }
})
</script>

<style>
  #searchWrapper{
    display: flex;
    justify-content: flex-start;
    margin: 1rem;
  }
  #searchWrapper .search{
    position: relative;
    display: flex;
    align-self: center;
    height: 3.5rem;
    border: 1px solid #a9b1bd;
    border-radius: 12px;
    margin-left: 5rem;
  }
  .text{
      width: 7.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #A9B1BD;
  }
  .input{
    width: 10rem;
    height: 3.5rem;
  }
  #rickAndMorty #searchWrapper .search .v-input{
      width: 150px;
      margin: 0;
      padding: 0;
  }
  #rickAndMorty #searchWrapper .search .v-text-field.v-input--is-focused > .v-input__control > .v-input__slot::after {
      display: none;
  }
  #rickAndMorty #searchWrapper .search .v-text-field > .v-input__control > .v-input__slot {
      background-color: #fff;
      height: 54px;
      border-radius: 0;
      padding-left: 25px;
      border-left: 1px solid #a9b1bd;
      border-right: 1px solid #a9b1bd;
      box-shadow: none;
  }
  #rickAndMorty #searchWrapper .search .v-text-field > .v-input__control > .v-input__slot input{
      color: #A9B1BD;
  }
  #rickAndMorty #searchWrapper .search .search-input{
      width: 200px;
      padding-left: 12px;
  }
  .search-input:focus-visible {
        outline: none;
  }
  .search-input-wrapper{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: center;
      padding: 0.8rem;
  }
  #app .v-autocomplete__content.v-menu__content {
    box-shadow: none;
      border: 1px solid #a9b1bd;
      border-top: none;
      border-radius: 0 0 12px 12px;
  }
  #app .v-list {
      padding: 0;
  }
  #app .v-list .v-list-item{
    border-top: 1px solid #a9b1bd;
      text-align: start;
      padding: 5px 25px;
  }
  #app .v-list .v-list-item .v-list-item__title{
      font-size: 16px;
      color: #a9b1bd;
      font-weight: 300;
  }
</style>