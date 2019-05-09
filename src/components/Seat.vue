<template>
  <div class="seat"
       :style="{ backgroundColor: seat.groupColor, borderColor: seat.rankColor}"
       :key="`${sectionName}-${rowName}-${seat.seat}`">
    <img src="../assets/seat.png">
  </div>
</template>

<script>
  export default {
    name: "seat",
    props: ['seat', 'sectionName', 'rowName']
  }
</script>

<style scoped>
  .seat {
    border: 4px solid;
    margin: 0.2em;
  }
</style>
