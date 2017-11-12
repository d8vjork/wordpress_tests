<template>
  <main class="container py-4">
    <router-view/>
  </main>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html, body {
    background-color: #eeeeee;
  }

  .post img {
    width: 100%;
    height: auto;
  }

  .fixed-nav {
    top: 1rem;
  }
</style>
