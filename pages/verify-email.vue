<template>
  <div>
    <h4 class="text-md font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Enter the confirmation code being sent to your email <strong>{{ $route.query?.email }}</strong>.
    </h4>
    <ConfirmationForm/>
  </div>
</template>
<script>
import ConfirmationForm from '../components/ConfirmationForm.vue';

export default {
  name: 'VerifyEmailPage',
  components: {
    ConfirmationForm,
  },
  layout: 'auth',
  mounted() {
    if(this.$route.query?.email === undefined) {
      this.$router.push('/login');
    }
  }
}
</script>