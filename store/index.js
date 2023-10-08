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
  setUserSessionLocalStorage(state) {
    localStorage.setItem('user', state.user)
  },
  clearUser(state) {
    state.user = null
  },
  clearLocalStorage() {
    localStorage.removeItem('user');
    localStorage.clear();
  }
}

export const getters = {
  authenticatedUser(state) {
    return state.user;
  },
  getUserSessionLocalStorage() {
    return localStorage.getItem('user');
  }
}

export const actions = {
  setUserSession({ commit }) {
    commit('setUser', Auth.user);
    commit('setUserSessionLocalStorage');
    commit('setUserAuthenticated', true);
  },

  async login({ dispatch }, { username, password }) {
    try {
      // make api request to AWS Amplify Auth.signIn
      await Auth.signIn(username, password);

      dispatch('setUserSession');

    } catch(error) {
      console.error('Error signing in:', error.message);
      throw new Error(`Error logging in due to ${error.message}`, { cause: error.name });
    }
  },

  async logout({ commit }) {
    try {
      // make api request to AWS Amplify Auth.signOut
      const response = await Auth.signOut();

      commit('setUserAuthenticated', false);
      commit('clearUser');
      commit('clearLocalStorage');

      return response;
    } catch(error) {
      throw new Error(`Error logging out due to ${error.message}`, { cause: error.name });
    }
  },

  async register({ commit }, formData) {
    try {
      // make api request to AWS Amplify Auth.signUp
      const { username, password, email, phone_number, full_name: name, address } = formData;
      const response = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
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
      console.error('Error signing up: ', error.message);
      throw new Error(`Error in signing up due to ${error.message}`, { cause: error.name });
    }
  },

  confirmRegisteredUser(_, { email, code }) {
    try {
      // make api request to AWS Amplify Auth.confirmSignUp
      return Auth.confirmSignUp(email, code);
    } catch(error) {
      console.error('Error confirming code: ', error.message);
      throw new Error(`Error in confirming code due to ${error.message}`, { cause: error.name });
    }
  },

  resendVerificationCode(_, { email }) {
    try {
      // make api request to AWS Amplify Auth.resendSignUp
      return Auth.resendSignUp(email);
    } catch(error) {
      console.error(error.message);
      throw new Error(`Error in re-sending confirmation code to this email ${email} due to ${error.message}`, { cause: error.name });
    }
  }
}