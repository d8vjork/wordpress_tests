<template>
  <article class="row">
    <aside class="col-lg-2">
      <div class="nav flex-lg-column nav-pills sticky-top fixed-nav mb-3">
        <router-link :to="{ name: 'home' }" class="nav-item nav-link">
          <i class="fa fa-home fa-fw"></i>
          Go to home
        </router-link>
        <a class="d-block d-lg-none nav-item nav-link" href="#comments">
          <i class="fa fa-comments fa-fw"></i>
          Comments
        </a>
      </div>
    </aside>

    <div class="col-12 col-lg-6 mr-auto">
      <div v-if="page" class="card post mb-3 mb-lg-0">
        <div class="card-body">
          <h4 class="card-title">
            {{ page.title.rendered }}
          </h4>
          <p v-html="page.content.rendered"></p>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-4 ml-auto">
      <div class="card">
        <div class="card-body" id="comments">
          <p class="lead text-center">
            <i class="fa fa-comments fa-fw"></i>
            Comments
          </p>
          <!-- <post-comments v-if="comments != null" :comments="comments"></post-comments> -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data () {
    return {
      page: null,
      comments: null
    }
  },

  mounted () {
    this.fetchPage()
  },

  methods: {
    fetchPage () {
      this.$http.get(
        'wp/v2/pages/' + this.$route.params.id
      ).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>
