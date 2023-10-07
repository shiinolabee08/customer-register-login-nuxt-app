import { Auth } from 'aws-amplify';

// state for user
export const state = () => ({
  user: null,
  authenticated: false,
});

export const mutations = {
  setUserAuthenticated(state, value) {
    state.authenticated = value;
  },
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null
  }
}

export const getters = {
  isUserAuthenticated({ state, getters }) {
    return state.authenticated && getters.authenticatedUser();
  },
  authenticatedUser() {
    return Auth.currentAuthenticatedUser();
  }
}

export const actions = {
  async login({ commit }, { username, password }) {
    try {

      // make api request to AWS Amplify Auth.signIn
      const user = await Auth.signIn(username, password);
      commit('setUser', user);
      commit('setUserAuthenticated', true);

      return user;
    } catch(error) {
      console.error('Error signing in:', error);
      throw new Error(`Error logging in due to ${error}`);
    }
  },

  async register({ commit }, formData) {
    try {
      // make api request to AWS Amplify Auth.signUp
      const { username, password, email, phone_number: phonenumber, full_name: name, address } = formData;

      console.log(formData);
      const response = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phonenumber,
          name,
          address
        },
      });

      const { user } = response;

      if (user) {
        commit('setUser', user);
      }

      return response;

    } catch(error) {
      console.error('Error signing up: ', error);
    }
  }
}