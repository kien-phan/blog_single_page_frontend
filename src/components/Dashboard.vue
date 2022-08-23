<template>
  <div class="container">
    <div class="row">
      <h2>Dashboard</h2>
      <form class="col-8 mx-auto" @submit.prevent="createPost()">
        <div class="form-group">
          <label for="title" class="form-label">title</label>
          <input class="form-control" :class="{ 'is-invalid': errors.title }" id="title" name="title" v-model="post.title" />
          <div class="invalid-feedback" v-if="errors.title">
            {{ errors.title[0] }}
          </div>
        </div>
        <div class="form-group">
          <label for="content" class="form-label">content</label>
          <textarea class="form-control" :class="{ 'is-invalid': errors.content }" name="content" v-model="post.content" rows="20"></textarea>
          <div class="invalid-feedback" v-if="errors.content">
            {{ errors.content[0] }}
          </div>
        </div>
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
  name: "Dashboard",
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      errors: {},
      loading: false,
    };
  },
  mounted() {
    this.checkLogIn();
  },
  methods: {
    checkLogIn: async function () {
      await BaseRequest.get("user")
        .then(() => {
          console.log("ccdcm");
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        });
    },

    createPost: async function () {
      this.loading = true;

      await BaseRequest.post("post", this.post)
        .then((res) => {
          console.log(res);
          alert("Dang bai thanh cong");
          this.post = { title: "", content: "" };
          this.errors = {}
        })
        .catch((error) => {
          this.loading = false;
          error.response.data.errors ? (this.errors = error.response.data.errors) : (this.errors = error.response.data);
          console.log(this.errors);
        });
      this.loading = false;
    },
  },
};
</script>

<style></style>
