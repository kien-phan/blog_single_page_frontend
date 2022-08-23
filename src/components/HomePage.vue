<template>
  <div class="container position-relative">
    <div class="row" v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <div>{{ post.content }}</div>
    </div>

    <div class="row">
      <nav aria-label="Page navigation example" v-if="!loading">
        <ul class="pagination">
          <li class="page-item" v-if="currentPage > 1">
            <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
          </li>
          <li class="page-item" v-for="page in totalPage" :key="page.id" :class="{active: currentPage==page}">
            <a class="page-link" href="#" @click.prevent="currentPage = page">{{page}}</a>
          </li>
          <li class="page-item" v-if="currentPage < totalPage">
            <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
          </li>
        </ul>
      </nav>
    </div>
    <div v-if="loading" class="spinner-border text-primary position-absolute top-50 start-50 mt-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import BaseRequest from "../core/BaseRequest.js";

export default {
  name: "HomePage",
  data() {
    return {
      posts: [],
      loading: false,
      currentPage: 1,
      totalPage: 0,
    };
  },
  mounted() {
    this.getPosts();
  },
  watch: {
    currentPage: function() {
      this.getPosts()
    }
  },
  methods: {
    getPosts: async function () {
      this.loading = true
      await BaseRequest.get("post?page=" + this.currentPage )
        .then((res) => {
          this.posts = res.data.data;
          this.totalPage = res.data.last_page;
          console.log(this.posts);
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>