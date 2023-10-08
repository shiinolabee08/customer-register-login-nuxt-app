<template>
  <div>
    <h3 class="text-lg text-center py-10 px-10">Welcome to Customer Portal</h3>

    <div
      class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 max-w-md">
      <h5
        class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {{authenticatedUser?.attributes?.name}}
      </h5>
      <p class="mb-2 text-base text-neutral-600 dark:text-neutral-200">
        <strong>Address:</strong> {{ authenticatedUser?.attributes?.address }}
      </p>
      <p class="mb-2 text-base text-neutral-600 dark:text-neutral-200">
        <strong>Contact Number:</strong> {{ authenticatedUser?.attributes?.phone_number }}
      </p>
      <p class="mb-2 text-base text-neutral-600 dark:text-neutral-200">
        <strong>Username:</strong> {{ authenticatedUser?.username }}
      </p>
      <p class="mb-2 text-base text-neutral-600 dark:text-neutral-200">
        <strong>Email:</strong> {{ authenticatedUser?.attributes?.email }}
      </p>
      <p class="mb-2 text-base text-neutral-600 dark:text-neutral-200">
        <strong>Email Verified:</strong> {{ authenticatedUser?.attributes?.email_verified ? 'Yes' : 'No' }}
      </p>
      <button
        type="button"
        class="inline-block rounded bg-[#2c66bb] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        @click="handleLogoutUser">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'IndexPage',
  middleware: 'auth',
  layout: 'home',
  mounted() {
    console.log(this.authenticatedUser);
  },
  computed: {
    ...mapGetters(['authenticatedUser']),
  },
  methods: {
    /* Dispatchers */
    ...mapActions(['logout']),
    /* Handlers */
    async handleLogoutUser(){
      await this.logout();
      this.$router.push('/login');
    }
  }
}
</script>
