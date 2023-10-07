<template>
  <div>
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Customer log in
    </h1>
    <LoginForm />

    <SuccessModal @hide="hideSuccessModal"/>
  </div>
</template>
<script>
import LoginForm from '../components/LoginForm.vue';
import SuccessModal from '../components/SuccessModal.vue';

export default {
  name: 'LoginPage',
  props: {
    username: String,
    confirmed: Boolean,
  },
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
    if(this.props.username && this.props.confirmed) {
      this.enableSuccessModal = true;
    }
  },
  methods: {
    hideSuccessModal() {
      enableSuccessModal = false;
    }
  },
  computed: {
    hasSuccessfulRegistered() {
      return this.props.username && this.props.confirmed;
    }
  },
}
</script>