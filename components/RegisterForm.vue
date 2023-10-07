<template>
  <form
    @submit.prevent="handleRegister"
    class="space-y-4 md:space-y-6 mt-6">
    <!-- Form Fields -->
    <div>
      <label
        for="full-name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Full Name:
      </label>
      <input
        v-model="newCustomer.full_name"
        type="text"
        placeholder="John Doe"
        @change="validateName"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <span
        class="text-red-500 text-base mt-4"
        v-if="!validFormFields.nameValid">
        You must enter your name.
      </span>
    </div>

    <div>
      <label
        for="contact-number"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Contact Number:
      </label>
      <input
        v-model="newCustomer.phone_number"
        type="text"
        placeholder="0435467917"
        maxlength="11"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>

    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Email:
      </label>
      <input
        v-model="newCustomer.email"
        type="email"
        @change="validateEmail"
        placeholder="johndoe@gmail.com"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <span
        class="text-red-500 text-base block"
        v-if="!isValidEmail && newCustomer.email">
        Email format is wrong and invalid.
      </span>
      <span
        class="text-red-500 text-base block"
        v-if="!validFormFields.emailValid && !newCustomer.email">
        You must enter your email.
      </span>
    </div>

    <div>
      <label
        for="address"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Address:
      </label>
      <textarea
        v-model="newCustomer.address"
        placeholder="Melbourne, Australia"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </textarea>
    </div>

    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Username:
      </label>
      <input
        v-model="newCustomer.username"
        @change="validateUsername"
        type="text"
        placeholder="e.g(johndoe0809)"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <span
        class="text-red-500 text-base mt-4"
        v-if="!validFormFields.usernameValid">
        You must enter your username.
      </span>
    </div>

    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Password:
      </label>
      <input
        v-model="newCustomer.password"
        type="password"
        placeholder="Choose your password"
        autocomplete="true"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <span
        class="text-red-500 text-base mt-4"
        v-if="!validFormFields.passwordValid">
        You must enter your password/confirm password.
      </span>
    </div>

    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Confirm Password:
      </label>
      <input
        v-model="confirmPassword"
        @change="validatePassword"
        type="password"
        placeholder="Confirm your password"
        autocomplete="true"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <span
        class="text-red-500 text-base mt-4"
        v-if="!isPasswordMatched && newCustomer.password && confirmPassword">
        Password does not match.
      </span>
    </div>
    <div class="block my-4">
      <span
        class="text-red-500 text-base mt-4"
        v-if="errors.length">
        {{errors}}
      </span>
    </div>

    <button
      type="submit"
      v-bind:disabled="!isPasswordMatched && newCustomer.password && confirmPassword"
      class="w-full text-white disabled:opacity-75 bg-[#2c66bb] hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      Submit
    </button>
    <p
      class="text-sm font-light text-gray-500 dark:text-gray-400">
      Already have an account?
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

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // validation of email regex

export default {
  name: 'RegisterForm',
  data() {
    return {
      newCustomer: {
        username: '',
        password: '',
        full_name: '',
        email: '',
        address: '',
        phone_number: '',
      },
      confirmPassword: '',
      validFormFields: {
        nameValid: true,
        emailValid: true,
        usernameValid: true,
        passwordValid: true,
      },
      errors: '',

    }
  },
  computed: {
    isPasswordMatched() {
      return this.newCustomer.password === this.confirmPassword;
    },
    isValidEmail() {
      return this.newCustomer.email.length && this.newCustomer.email.match(emailRegex);
    }
  },
  methods: {
    /* Dispatchers */
    ...mapActions(['register']),

    /* Validators */
    validateName() {
      this.validFormFields.nameValid = this.newCustomer.full_name.length > 0;
    },
    validateEmail() {
      this.validFormFields.emailValid = this.newCustomer.email.match(emailRegex);
    },
    validateUsername() {
      this.validFormFields.usernameValid = this.newCustomer.username.length > 0;
    },
    validatePassword() {
      this.validFormFields.passwordValid = this.isPasswordMatched;
    },

    /* Handlers */
    async handleRegister(evt) {
      evt.preventDefault();
      try {
        this.validateName();
        this.validateEmail();
        this.validateUsername();
        this.validatePassword();

        if(this.validFormFields.nameValid && this.validFormFields.usernameValid && this.validFormFields.passwordValid) {
          const newCustomerRequest = await this.register(this.newCustomer);

          if(newCustomerRequest) {
            // Redirect to log-in page after successful registration
            this.handleRegisterSuccess(newCustomerRequest)
          }
        }

      } catch (error) {
        // Handle registration error
        console.error(error);
      }
    },
    handleRegisterSuccess(response) {
      console.log(response)

      const { userConfirmed, user } = response;
      this.$router.push({ name: 'login', params: {
          username: user.username,
          confirmed: userConfirmed,
        }
      });
    },
  },
}
</script>

