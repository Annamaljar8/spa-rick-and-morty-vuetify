<template>
  <div id="searchWrapper">
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
    <input shaped class="search-input" @change="filterValue">
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as types from '@/store/types';

export default({
      data () {
        return {
          items: [
            'Name',
            'ID',
            'Episode',
          ],
          typeOfFilter: '',
        }
    },
   
    methods: {
      ...mapActions({
        searchByName: types.SEARCH_BY_NAME,
      }),
      handleChange(value){
        this.typeOfFilter = value;
      },
      filterValue(e){
        this.searchByName(e.target.value.toLowerCase())
        console.log(e.target.value)
      }
    }
})
</script>


<style>
  #searchWrapper{
      display: flex;
      justify-content: center;
      margin: 3rem;
      
  }
  #searchWrapper .search{
    position: relative;
    display: flex;
    align-self: center;
    height: 3.5rem;
    border: 1px solid #a9b1bd;
    border-radius: 12px;
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
    width: 225px;
    padding-left: 25px;
}
.search-input:focus-visible {
      outline: none;
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