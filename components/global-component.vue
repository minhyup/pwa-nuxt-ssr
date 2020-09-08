<template>
  <div>
    <button @click="showTitle">Click</button>
    <span>title</span>
     <!-- <slot></slot> -->
  </div>
</template>

<script>
  export default {
    name: 'global-component',
    props: {
      minhyup: {
        type: String,
        required: false,
      }
    },
    data () {
      return {
        title: void 0
      }
    },
    methods: {
      showTitle () {
        this.title = 'Global Component!!'
      }
    }
  }
</script>

<style scoped>
  div {
    padding: 20px
  }

  div span {
    margin: 20px
  }
</style>
