<template>
  <div class="legend-theater">
    <div class="group-legend">
      <b>Group</b>
      <div
        v-for="color,id in legendMap.groupColor"
        class="item"
        :key="id">
        <div class="square" :style="{ backgroundColor: color}"></div>
        <div class="group-id">ID: {{id}}</div>
      </div>
    </div>
    <div class="rank-legend">
      <b>Rank</b>
      <div
        v-for="color,id in legendMap.rankColor"

        class="item"
        :key="id">
        <div class="square" :style="{ borderColor: color}"></div>
        <div class="rank-id">{{id}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "legendTheater",
    props: ['legendMap']
  }
</script>

<style scoped>
  .rank-legend {
    margin-top: 2em;
  }

  .legend-theater {
    width: 30%;
  }

  .item {
    display: flex;
    padding: 1em;
    justify-content: space-evenly
  }

  .square {
    border: transparent 4px solid;
    width: 20px;
    height: 20px;
  }
</style>
