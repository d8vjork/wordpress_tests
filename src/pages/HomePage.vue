<template>
  <div>
    <div class="card-columns">
      <div v-for="(post, index) in posts" v-bind:key="index" class="card post">
        <div class="card-body">
          <h4 class="card-title">
            <router-link :to="{ name: 'posts.single', params: { id: post.id } }">
              {{ post.title.rendered }}
            </router-link>
          </h4>
          <p class="card-text" v-html="post.excerpt.rendered || post.content.rendered"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: []
    }
  },

  mounted () {
    this.loadInitialPosts()
  },

  methods: {
    loadInitialPosts () {
      this.$http({
        method: 'get',
        url: 'wp/v2/posts',
        params: {
          per_page: 6,
          page: 1
        }
      }).then(res => {
        // console.log(res.data)
        this.posts = res.data
      })
    }
  }
}
</script>
