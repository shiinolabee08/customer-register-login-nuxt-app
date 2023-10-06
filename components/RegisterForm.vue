<template>
  <div>
    <h1>Register</h1>
    <form
      @submit="handleRegister">
      <!-- Form Fields -->
      <div class="d-block">
        <label
          for="full-name">
          Full Name:
        </label>
        <input
          v-model="newCustomer.full_name"
          type="text"
          placeholder="John Doe"
        />
      </div>
      <div class="d-block">
        <label
          for="address">
          Address:
        </label>
        <textarea
          v-model="newCustomer.address"
          placeholder="Melbourne, Australia">
        </textarea>
      </div>

      <div class="d-block">
        <label
          for="contact-number">
          Contact Number:
        </label>
        <input
          v-model="newCustomer.phone_number"
          type="text"
          placeholder="0435467917"
          maxlength="11"
        />
      </div>

      <div class="d-block">
        <label
          for="email">
          Username:
        </label>
        <input
          v-model="newCustomer.full_name"
          type="text"
          placeholder="e.g(johndoe0809)"
        />
      </div>

      <div class="d-block">
        <label
          for="password">
          Password:
        </label>
        <input
          v-model="newCustomer.password"
          type="password"
          placeholder="Choose your password"
        />
      </div>

      <div class="d-block">
        <label
          for="password">
          Confirm Password:
        </label>
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Choose your password"
        />
        <!-- <span v-if=""></span> -->
      </div>
      <button
        type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newCustomer = ref({
  username: '',
  password: '',
  full_name: '',
  address: '',
  phone_number: '',
});

const confirmPassword = ref('');

const handleRegister = async() => {
  try {
    await this.$store.dispatch('register', newCustomer);
    // Redirect or perform other actions after successful registration

  } catch (error) {
    // Handle registration error
    console.error(error);
  }
}
</script>