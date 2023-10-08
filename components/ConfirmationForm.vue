<template>
  <form
    ref="confirmationCodeForm"
    @submit.prevent="handleConfirmCode"
    class="space-y-4 md:space-y-6 mt-6">
    <div>
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Code
      </label>
      <input
        type="text"
        name="code"
        v-model="code"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="132456"
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
        Verify
    </button>
    <p
      class="text-sm font-light text-gray-500 dark:text-gray-400">
      Didn't receive the code?
      <a
        href="#"
        @click="handleResendCode"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500">
          Resend code
      </a>
      <span
        v-if="isSuccessCodeSent"
        class="text-base text-green-500">
          Successfully sent new code.
      </span>
    </p>
    <p
      class="text-sm font-light text-gray-500 dark:text-gray-400 mt-0">
      Already confirmed?
      <a
        href="/login"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500">
          Log in
      </a>
    </p>
  </form>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConfirmationForm',
  data() {
    return {
      code: '',
      errorMsg: '',
      isSuccessCodeSent: false,
    }
  },

  mounted() {
    this.$refs.confirmationCodeForm.reset();
  },

  methods: {
    /* Dispatchers */
    ...mapActions(['confirmRegisteredUser', 'resendVerificationCode']),

    /* Handlers */
    async handleConfirmCode() {
      console.log(this.$route.query?.email);
      try {
        if (this.code.length && this.$route.query?.email) {
          const formData = {
            email: this.$route.query?.email,
            code: this.code,
          }
          console.log(formData);
          const response = await this.confirmRegisteredUser(formData);

          if(response) {
            this.handleSuccess(response);
          }
        }
      } catch(error) {
        this.errorMsg = error.toString();
      }
    },

    async handleResendCode() {
      try {
        const email = this.$route.query?.email;
        const response = await this.resendVerificationCode(email);

        if(response) {
          this.isSuccessCodeSent = true;
        }

      } catch(error) {
        this.errorMsg = error.toString();
      }
    },

    handleSuccess(response) {
      this.$router.push({ name: 'login', params: {
          username: this.$route.query?.email,
          confirmed: response && response == 'SUCCESS' ? true : false,
        }
      });
    },
  }
}
</script>