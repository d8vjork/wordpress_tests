<template>
  <div>
    <ul v-if="comments.length != 0" class="list-unstyled">
      <li v-for="(comment, index) in comments" :key="index" class="media">
        <a v-if="comment.author_url" :href="comment.author_url" class="mr-3">
          <img class="rounded-circle" :src="comment.author_avatar_urls[24]" data-toggle="tooltip" data-placement="top" :title="comment.author_name">
        </a>
        <img v-else class="mr-3 rounded-circle" :src="comment.author_avatar_urls[24]" data-toggle="tooltip" data-placement="top" :title="comment.author_name">
        <div class="media-body" v-html="comment.content.rendered"></div>
      </li>
    </ul>
    <div v-else>
      <p>No comments found!</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>
