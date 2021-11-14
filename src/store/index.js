import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import * as types from './types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiEndpoint: 'https://rickandmortyapi.com/api',
    apiCharacters: '/character',
    apiPage: '/?page=',
    apiName:'?name=',
    characters: [],
    info: [],
    currentPage: 1,
    arrFavorites: [],
    tmp: {},
    arrFavoritesCurrent: [],
    arrCurrentPage: 1,
    sizeTable: 20,
    selectedTypeSearch: '',
    searchValue: '',
  },
  
  getters: {
    [types.CHARACTERS]: (state) => state.characters,
    [types.INFO]: (state) => state.info,
    [types.GET_CURRENT_PAGE]: (state) => state.currentPage,
    [types.GET_FAVORITE]: (state) =>state.arrFavorites,
    [types.GET_FAVORITE_CURRENT]: (state) =>state.arrFavoritesCurrent,
    [types.GET_ARR_CURRENT_PAGE]: (state) => state.arrCurrentPage,
    [types.SIZE_TABLE]: (state) => state.sizeTable,
  },
  mutations: {
    [types.GET_CHARACTERS]: (state, payload) => {
      state.characters = payload;
    },
    [types.GET_INFO]: (state, payload) => {
      state.info = payload;
    },
    [types.SET_CURRENT_PAGE]: (state, payload) => {
      state.currentPage = payload;
    },
    [types.SET_FAVORITE]: (state, payload) => {
      state.arrFavorites.push(
        payload
      );
    },
    [types.DELETE_FAVORITE]: (state, payload) => {
      state.arrFavorites = state.arrFavorites.filter(item => item !== payload);
      let tmp = state.arrFavorites;
      let startItem = (state.arrCurrentPage - 1) * state.sizeTable;
      state.arrFavoritesCurrent = [];
      for(var i = 0; i < tmp.length; i++){
        if((i >= startItem) && (i < (startItem + state.sizeTable))){
          state.arrFavoritesCurrent.push(tmp[i]);
        }
      }
    },
    [types.SET_TMP]: (state, payload) => {
      state.tmp = payload;
    },
    [types.SET_FAVORITE_CURRENT]: ( state , payload) => {
      console.log('payload', payload)
      let tmp = state.arrFavorites;
      let startItem = (payload - 1) * state.sizeTable;
      state.arrFavoritesCurrent = [];
      for(var i = 0; i < tmp.length; i++){
        if((i >= startItem) && (i < (startItem + state.sizeTable))){
          state.arrFavoritesCurrent.push(tmp[i]);
        }
      }
      state.arrCurrentPage = payload;
      console.log('arrFavoritesCurrent', state.arrFavoritesCurrent)
    },
    [types.GET_SELECTED_TYPE_SEARCH]: (state, payload) => {
      state.selectedTypeSearch = payload;
    },
    [types.GET_SEARCH_VALUE]: (state, payload) => {
      state.searchValue = payload;
    },
  },
  actions: {
    [types.GET_CHARACTERS]: async ({ commit, state }) => {
      let res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}`);
      console.log('222', res)
      //-------------------------------------------------
      var url = '';
      
      for(var [key, item] of Object.entries(res.data?.results)){
        url = item.episode[item.episode.length - 1];
        let tmpObj = state.tmp;
        if(typeof(tmpObj[url]) !== 'undefined'){
          res.data.results[key].episodeCode = tmpObj[url];
        } else {
          const resEpizode = await axios.get(url);
          res.data.results[key].episodeCode = resEpizode.data.episode;
          tmpObj[url] = resEpizode.data.episode;
          commit(types.SET_TMP, tmpObj);
        }
      }
      //-----------------------------------------------
      commit(types.GET_CHARACTERS, res.data?.results);
      commit(types.GET_INFO, res.data?.info);
    },
    [types.SET_CURRENT_PAGE]: async ({ commit, state }, payload) => {
      let selectedTypeSearch = state.selectedTypeSearch;
      let searchValue = state.searchValue;
      let res = '';
      if((selectedTypeSearch === '') || (searchValue === '')){
        res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiPage}${payload}`);
      } else {
        res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiPage}${payload}${selectedTypeSearch}${searchValue}`);
      }
      
      //-------------------------------------------------
      var url = '';
      
      for(var [key, item] of Object.entries(res.data?.results)){
        url = item.episode[item.episode.length - 1];
        let tmpObj = state.tmp;
        if(typeof(tmpObj[url]) !== 'undefined'){
          res.data.results[key].episodeCode = tmpObj[url];
        } else {
          const resEpizode = await axios.get(url);
          res.data.results[key].episodeCode = resEpizode.data.episode;
          tmpObj[url] = resEpizode.data.episode;
          commit(types.SET_TMP, tmpObj);
        }
      }
      //-----------------------------------------------
      commit(types.SET_CURRENT_PAGE, payload);
      commit(types.GET_CHARACTERS, res.data?.results);
    },

    //-----------------search------------//
    [types.SEARCH_BY_NAME]: async ({ commit, state }, payload) => {
      const res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiName}${payload}`);
      console.log('payloadsasdasdsa', payload)
      // commit(types.SET_CURRENT_PAGE, payload);
      commit(types.GET_CHARACTERS, res.data?.results);
      console.log("sdfsds", res.data)
      commit(types.GET_INFO, res.data?.info);
      commit(types.GET_SELECTED_TYPE_SEARCH, '&name=');
      commit(types.GET_SEARCH_VALUE, payload);
      /////////////////TO DO Last Episode////////////////
    },
    //-----------------------------------//
  }
})
