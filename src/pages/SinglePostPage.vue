<template>
  <article class="row">
    <aside class="col-lg-2">
      <div class="nav flex-column nav-pills sticky-top fixed-nav">
        <router-link :to="{ name: 'home' }" class="nav-item nav-link">
          <i class="fa fa-home fa-fw"></i>
          Go to home
        </router-link>
      </div>
    </aside>

    <div class="col-12 col-lg-6 mr-auto">
      <div v-if="post" class="card post">
        <div class="card-body">
          <h4 class="card-title">
            {{ post.title.rendered }}
          </h4>
          <h6 class="card-subtitle mb-3 text-muted">
            Posted by
            <router-link :to="{ name: 'authors.single', params: { id: post.author.id } }">
              {{ post.author.name }}
            </router-link>
          </h6>
          <p v-html="post.content.rendered"></p>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-4 ml-auto">
      <div class="card">
        <div class="card-body">
          <post-comments v-if="comments != null" :comments="comments"></post-comments>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import PostComments from '../components/PostComments'

export default {
  components: {
    PostComments
  },

  data () {
    return {
      post: null,
      comments: null
    }
  },

  mounted () {
    this.fetchPost()
    this.fetchComments()
  },

  methods: {
    fetchPost () {
      this.$http({
        method: 'get',
        url: 'wp/v2/posts/' + this.$route.params.id,
        params: {
          per_page: 6,
          page: 1
        }
      }).then(res => {
        this.post = res.data
        this.fetchUser()
      })
    },

    fetchComments () {
      this.$http({
        method: 'get',
        url: 'wp/v2/comments',
        params: {
          post: this.$route.params.id,
          per_page: 15,
          page: 1
        }
      }).then(res => {
        this.comments = res.data
      })
    },

    fetchUser () {
      this.$http.get(
        'wp/v2/users/' + this.post.author
      ).then(res => {
        this.post.author = res.data
      })
    }
  }
}
</script>
