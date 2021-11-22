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
    apiEpisodes: '/episode',
    apiEpisode: '?episode=',
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
    searchByEpisodeId: []
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
    [types.SET_SELECTED_TYPE_SEARCH]: (state, payload) => {
      state.selectedTypeSearch = payload;
    },
    [types.SET_SEARCH_VALUE]: (state, payload) => {
      state.searchValue = payload;
    },
    [types.SEARCH_BY_EPISODE_ID]: (state, payload) => {
      state.searchByEpisodeId = payload;
    },
  },
  actions: {
    getEpisodeLastCode: async ({commit, state}, results) => {
      let url = '';
      for(var [key, item] of Object.entries(results)){
        url = item.episode[item.episode.length - 1];
        let tmpObj = state.tmp;
        if(typeof(tmpObj[url]) !== 'undefined'){
          results[key].episodeCode = tmpObj[url];
        } else {
          const resEpizode = await axios.get(url);
          results[key].episodeCode = resEpizode.data.episode;
          tmpObj[url] = resEpizode.data.episode;
          commit(types.SET_TMP, tmpObj);
        }
      }
      return results;
    },
    [types.GET_CHARACTERS]: async ({ commit, dispatch, state }) => {
      let res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}`);
      dispatch('getEpisodeLastCode', res.data.results).then((data) => {
        res.data.results = data;
        commit(types.GET_CHARACTERS, res.data?.results)
      });
      commit(types.GET_INFO, res.data?.info);
    },
    [types.SET_CURRENT_PAGE]: async ({ commit, dispatch, state }, payload) => {
      let selectedTypeSearch = state.selectedTypeSearch;
      let searchValue = state.searchValue;
      let res = '';
      if((selectedTypeSearch === '') || (searchValue === '')){
        res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiPage}${payload}`);
      } else {
        if(selectedTypeSearch === '&episode='){
          let arrIds = state.searchByEpisodeId;
            arrIds = arrIds.slice((payload - 1) * state.sizeTable, payload * state.sizeTable);
            arrIds = arrIds.join(',');
          let resTmp = await axios.get(`${state.apiEndpoint}${state.apiCharacters}/${arrIds}`);
            res = {data:{results:resTmp.data}};
        } else {
            res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiPage}${payload}${selectedTypeSearch}${searchValue}`);
        }
      }
      dispatch('getEpisodeLastCode', res.data.results).then((data) => {
        res.data.results = data;
        commit(types.GET_CHARACTERS, res.data?.results)
      });
      commit(types.SET_CURRENT_PAGE, payload);
    },

    //-----------------search--------------//
    [types.SEARCH_BY_NAME]: async ({ commit, dispatch, state }, payload) => {
      const res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}${state.apiName}${payload}`);
    
      commit(types.GET_INFO, res.data?.info);
      commit(types.SET_SELECTED_TYPE_SEARCH, '&name=');
      commit(types.SET_SEARCH_VALUE, payload);

      dispatch('getEpisodeLastCode', res.data.results).then((data) => {
        res.data.results = data;
        commit(types.GET_CHARACTERS, res.data?.results)
      });
    },
    [types.SEARCH_BY_ID]: async ({ commit, dispatch, state }, payload) => {
      const res = await axios.get(`${state.apiEndpoint}${state.apiCharacters}/${payload}`);
    
      commit(types.GET_INFO, res.data?.info);
  
      dispatch('getEpisodeLastCode', [res.data]).then((data) => {
        [res.data] = data;
        commit(types.GET_CHARACTERS, [res.data])
      });
    },
    [types.SEARCH_BY_EPISODE]: async ({ commit, dispatch,  state }, payload) => {
      const res = await axios.get(`${state.apiEndpoint}${state.apiEpisodes}${state.apiEpisode}${payload}`);

      let characters = res.data.results[0].characters;
      let arrId = [];
      for (var i = 0; i < characters.length; i++){
        let str = characters[i];
        str = str.split('https://rickandmortyapi.com/api/character/');
        arrId.push(str[1]);
      }
      commit(types.SEARCH_BY_EPISODE_ID, arrId);
      
      let pages =  Math.ceil(arrId.length / state.sizeTable)
    
        arrId.slice(0, state.sizeTable);
        arrId = arrId.join(',');

      let resCurrentCharacters = await axios.get(`${state.apiEndpoint}${state.apiCharacters}/${arrId}`);

      commit(types.GET_INFO, {pages:pages});
      commit(types.SET_SELECTED_TYPE_SEARCH, '&episode=');
      commit(types.SET_SEARCH_VALUE, payload);
      
      dispatch('getEpisodeLastCode', resCurrentCharacters.data).then((data) => {
        resCurrentCharacters.data = data;
        commit(types.GET_CHARACTERS, resCurrentCharacters.data)
      });
    },
  }
})
