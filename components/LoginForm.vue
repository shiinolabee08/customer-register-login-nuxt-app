<template>
  <form
    @submit.prevent="handleLogin"
    class="space-y-4 md:space-y-6 mt-6">
    <div>
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Your username
      </label>
      <input
        type="text"
        name="username"
        v-model="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@company.com"
        required="">
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
      </label>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required="">
    </div>
    <div class="block my-4">
      <span
        class="text-red-500 text-base mt-4"
        v-if="errorMsg.length">
        {{errorMsg}}
      </span>
    </div>
    <button
      type="submit"
      class="w-full text-white bg-[#2c66bb] hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Log in
    </button>
    <p
      class="text-sm font-light text-gray-500 dark:text-gray-400">
      Don't have an account yet?
      <a
        href="/register"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500">
          Sign up
      </a>
    </p>
  </form>
</template>
<script>
import { mapActions } from 'vuex';
/* import AWSCognitoAuthErrorException from '../utils/aws-cognito-auth-error.enum'; */

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      loginAttempts: 0,
      errorMsg: '',
    }
  },

  methods: {
    /* Dispatchers */
    ...mapActions(['login']),

    /* Handlers */
    async handleLogin() {
      const { username, password } = this;

      try {
        await this.login({ username, password });

        this.handleSuccessRedirect();
      } catch(error) {
        this.loginAttempts++;
        this.errorMsg = error.toString();

        if(error.cause && error.cause == 'UserNotConfirmedException'/* AWSCognitoAuthErrorException.USER_NOT_CONFIRMED */) {
          // #TODO - NOTE temporarily set condition since ts is disabled AWSCognitoAuthErrorException.USER_NOT_CONFIRMED == UserNotConfirmedException
          this.$router.push({ path: '/verify-email', query: {
              email: username,
            }
          });
        }
      }
    },

    handleSuccessRedirect() {
      this.$router.push('/');
    }
  }
}
</script>
