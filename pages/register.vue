<template>
  <div>
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Customer Sign up
    </h1>
    <RegisterForm />
  </div>

</template>
<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm,
  },
  layout: 'auth',
}
</script>