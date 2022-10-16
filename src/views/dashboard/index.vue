<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <svg-icon icon-class="eye-open" /> -->
    <Uploading @success="success1" />
  </div></template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }, methods: {
    success1(url) {
      console.log(url)
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
