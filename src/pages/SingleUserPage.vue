<template>
  <div v-if="author != null">
    <div class="row">
      <div class="col-9 ml-auto">
        <div class="text-center mb-5">
          <img :src="author.avatar_urls[96]" class="border border-dark rounded-circle" alt>
          <h1 class="display-4">@{{ author.slug }}</h1>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <div class="nav flex-column nav-pills sticky-top fixed-nav">
          <router-link :to="{ name: 'home' }" class="nav-item nav-link">
            <i class="fa fa-home fa-fw"></i>
            Go to home
          </router-link>
          <a class="nav-item nav-link" href="#">
            <i class="fa fa-user fa-fw"></i>
            Profile
          </a>
          <a class="nav-item nav-link active" href="#">
            <i class="fa fa-bookmark fa-fw"></i>
            Posts
          </a>
          <a class="nav-item nav-link" href="#">
            <i class="fa fa-comments fa-fw"></i>
            Comments
          </a>
        </div>
      </div>

      <div class="col-9">
        <section class="row">
          <div class="col-12 col-lg-8 mx-auto">
            <div v-if="posts != null">
              <div v-for="(post, index) in posts" v-bind:key="index" class="card post mb-3">
                <div class="card-body">
                  <h4 class="card-title">
                    <router-link :to="{ name: 'posts.single', params: { id: post.id } }">
                      {{ post.title.rendered }}
                    </router-link>
                  </h4>
                  <p v-html="post.excerpt.rendered || post.content.rendered"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      author: null,
      posts: null
    }
  },

  mounted () {
    this.fetchUser()
  },

  methods: {
    fetchUser () {
      this.$http.get(
        'wp/v2/users/' + this.$route.params.id
      ).then(res => {
        this.author = res.data
        this.fetchPosts()
      })
    },

    fetchPosts () {
      this.$http({
        method: 'get',
        url: 'wp/v2/posts',
        params: {
          author: this.$route.params.id,
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
