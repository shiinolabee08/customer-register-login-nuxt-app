import Auth from 'aws-amplify';

// state for user
export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null
  }
}

export const actions = {
  async login({ commit }, { username, password }) {
    try {

      // make api request to AWS Amplify Auth.signIn
      const user = await Auth.signIn(username, password);
      commit('setUser', user);

    } catch(error) {
      console.error('Error signing in:', error);
    }
  },

  async register({ commit }, formData) {
    try {
      // make api request to AWS Amplify Auth.signUp
      const { username, password, email, phone_number, full_name: name, address } = formData;
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
          name,
          address
        },
      });

      if (user) {
        commit('setUser', user);
      }
    } catch(error) {
      console.error('Error signing up: ', error);
    }
  }
}