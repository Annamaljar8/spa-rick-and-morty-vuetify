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
    characters: [],
    info: [],
    currentPage: 1,
    arrFavorites: [],
    tmp: {}
  },
  
  getters: {
    [types.CHARACTERS]: (state) => state.characters,
    [types.INFO]: (state) => state.info,
    [types.GET_CURRENT_PAGE]: (state) => state.currentPage,
    [types.GET_FAVORITE]: (state) =>state.arrFavorites,
    
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
    },
    [types.SET_TMP]: (state, payload) => {
      state.tmp = payload;
    }
  },
  actions: {
    [types.GET_CHARACTERS]: async ({ commit, state }, payload) => {
      let res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}`);
      console.log('222', res.data)
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
      const res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiPage}${payload}`);
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
    
    
    
    // [types.GET_COMMENTS]: async ({ commit, state }, payload) => {
    //   const res = await axios.get(`${state.apiEndpoint}${api.COMMENTS}${payload}`);
    //   commit(types.GET_COMMENTS, res.data);
  }
})
