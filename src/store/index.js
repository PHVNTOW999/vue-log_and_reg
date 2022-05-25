import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    users: []
  },
  mutations: {
    SET_USERS_FROM_API (state, users) {
      state.users = users
    }
  },
  actions: {
    GET_USERS_FROM_API ({ commit }) {
      return axios.get("http://localhost:3000/users").then((users) => { 
        commit("SET_USERS_FROM_API", users.data);
        return users
      })
    }
  },
  getters: {
    USERS(state) {
      return state.users
    }
  }
})
