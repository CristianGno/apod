<template>
  <div>
    <div class="container-fluid">
      <navbar></navbar>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <content-principal></content-principal>
        </div>

        <div class="col-sm-12">
          <footer-site></footer-site>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
</style>