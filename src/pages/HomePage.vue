<template>
  <div class="row">
    <div class="col-12 col-lg-3 mb-3">
      <div v-if="items != null" class="nav flex-column nav-pills sticky-top fixed-nav">
        <router-link :to="{ name: 'home' }" class="nav-item nav-link">
          <i class="fa fa-home fa-fw"></i>
          Home
        </router-link>
        <router-link v-for="(item, index) in items.primary" :key="index" :to="{ name: 'pages.single', params: { id: item.object_id } }" class="nav-item nav-link">
          <i v-if="item.attr" :class="item.attr + ' fa-fw'"></i>
          {{ item.title }}
        </router-link>
      </div>
    </div>
    <div class="col-12 col-lg-9">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      items: null
    }
  },

  mounted () {
    this.loadInitialPosts()
    this.fetchMenus()
  },

  methods: {
    fetchMenus () {
      this.$http(
        'wp-api-menus/v2/menu-locations'
      ).then(res => {
        Object.keys(res.data).forEach(function (item) {
          this.fetchMenuItems(item)
        }, this)
      })
    },

    fetchMenuItems (menu) {
      this.$http(
        'wp-api-menus/v2/menu-locations/' + menu
      ).then(res => {
        this.items = {}
        this.items[menu] = res.data
      })
    },

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
