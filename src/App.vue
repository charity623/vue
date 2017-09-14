<template>
  <div id="app">
    <router-view class="router-view"></router-view>
    <!-- <loading v-model="isLoading"></loading> -->
  </div>
</template>

<script>
// import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
    components: {
      // Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    }
};
</script>

<style>
html, body{ height:100%;background:#f4f4f4; }
#app {
  width:100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
