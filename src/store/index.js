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
    nextPage: '',
    prevPage: '',
    arrFavorites: []
   
  },
  getters: {
    [types.CHARACTERS]: (state) => state.characters,
    [types.INFO]: (state) => state.info,
    [types.GET_CURRENT_PAGE]: (state) => state.currentPage,
    [types.GET_NEXT_PAGE]: (state) => state.nextPage,
    [types.GET_PREV_PAGE]: (state) => state.prevPage,
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
    [types.SET_NEXT_PAGE]: (state, payload) => {
      state.nextPage = payload;
    },
    [types.SET_PREV_PAGE]: (state, payload) => {
      state.prevPage = payload;
    },
    [types.SET_FAVORITE]: (state, payload) => {
      state.arrFavorites.push(
        payload
      );
    },
    [types.DELETE_FAVORITE]: (state, payload) => {
      state.arrFavorites = state.arrFavorites.filter(item => item !== payload);
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
      commit(types.SET_NEXT_PAGE, res.data?.info?.next);
      commit(types.SET_PREV_PAGE, res.data?.info?.prev);
      commit(types.GET_CHARACTERS, res.data?.results);
    },
    // [types.DELETE_FAVORITE]: ({ commit, state }, payload) => {
    //   commit(types.DELETE_FAVORITE, payload);
    //   console.log('3 payload', payload);
    // }
    
    
    // [types.GET_COMMENTS]: async ({ commit, state }, payload) => {
    //   const res = await axios.get(`${state.apiEndpoint}${api.COMMENTS}${payload}`);
    //   commit(types.GET_COMMENTS, res.data);
  }
})
