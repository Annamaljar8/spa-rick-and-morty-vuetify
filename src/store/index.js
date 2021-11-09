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
    lastEpisode: ''
   
  },
  
  getters: {
    [types.CHARACTERS]: (state) => state.characters,
    [types.INFO]: (state) => state.info,
    [types.GET_CURRENT_PAGE]: (state) => state.currentPage,
    [types.GET_FAVORITE]: (state) =>state.arrFavorites,
    [types.GET_LAST_EPISODE]: (state) =>{state.lastEpisode 
      console.log('state.lastEpisode', state.lastEpisode);},
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
    [types.SET_LAST_EPISODE]: (state, payload) => {
      console.log('payload', payload);
      state.lastEpisode = payload;
    }
  },
  actions: {
    [types.GET_CHARACTERS]: async ({ commit, state }, payload) => {
      const res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}`);
      console.log('222', res.data)
      commit(types.GET_CHARACTERS, res.data?.results);
      commit(types.GET_INFO, res.data?.info);
    },
    [types.SET_CURRENT_PAGE]: async ({ commit, state }, payload) => {
      const res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiPage}${payload}`);
      commit(types.SET_CURRENT_PAGE, payload);
      commit(types.GET_CHARACTERS, res.data?.results);
    },
    [types.SET_LAST_EPISODE]: async ({ commit }, payload) => {
      console.log('payload', payload);
      const res = await axios.get(payload);
      commit(types.SET_LAST_EPISODE, res.data.episode);
      console.log('res.episode', res.data.episode);
    }
    
    
    // [types.GET_COMMENTS]: async ({ commit, state }, payload) => {
    //   const res = await axios.get(`${state.apiEndpoint}${api.COMMENTS}${payload}`);
    //   commit(types.GET_COMMENTS, res.data);
  }
})
