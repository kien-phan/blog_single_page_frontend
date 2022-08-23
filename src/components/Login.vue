<template>
  <div class="container mt-5">
    <div class="row">
      <form class="col-4 mx-auto" @submit.prevent="sendUserLogin()">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input class="form-control" :class="{ 'is-invalid': errors.email }" id="email" name="email" aria-describedby="emailHelp" v-model="user.email" />
          <div class="invalid-feedback" v-if="errors.email">
            {{ errors.email[0] }}
          </div>
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }" id="password" name="password" v-model="user.password" />
          <div class="invalid-feedback" v-if="errors.password">
            {{ errors.password[0] }}
          </div>
        </div>
        <!-- <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div> -->
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div v-if="loading" class="spinner-border text-primary position-absolute" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import BaseRequest from "../core/BaseRequest.js";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
      loading: false,
    };
  },
  methods: {
    sendUserLogin: async function() {
      this.loading = true;
      await BaseRequest
        .post('login', this.user)
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.loading = false;
          error.response.data.errors? this.errors = error.response.data.errors : this.errors = error.response.data
          console.log(this.errors)
        });
    },
  },
};

//dùng axios để gửi thông tin đăng nhập đến server
</script>

<style></style>
