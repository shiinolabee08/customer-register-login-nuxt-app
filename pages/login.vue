<template>
  <div>
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Customer log in
    </h1>
    <LoginForm />

    <SuccessModal
      v-bind:show="enableSuccessModal"
      @hide="hideSuccessModal"/>
  </div>
</template>
<script>
import LoginForm from '../components/LoginForm.vue';
import SuccessModal from '../components/SuccessModal.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm,
    SuccessModal,
  },
  layout: 'auth',
  data() {
    return {
      enableSuccessModal: false,
    }
  },
  mounted() {
    const { username, confirmed } = this.$route.params;
    if(username && confirmed) {
      this.enableSuccessModal = true;
    }
  },
  methods: {
    hideSuccessModal() {
      this.enableSuccessModal = false;
    }
  },
}
</script>