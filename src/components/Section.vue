<template>
  <div class="section-theater">
    <h2>{{section.name}}</h2>
    <Row v-for="row in section.rows"
         :row="row"
         :name="section.name"
         :key="`${section.name}-${row.row}`">
    </Row>
  </div>
</template>

<script>
  import Row from './Row'
  export default {
    name: "section-theater",
    props: ['section'],
    components: {
      Row
    }
  }
</script>

<style scoped>
  .section-theater {
    margin: 2em 0em 2em 0em;
  }
</style>
