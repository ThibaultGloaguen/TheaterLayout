<template>
  <div class="row">
    <Seat v-for="seat in row.seats"
          :seat="seat"
          :sectionName="name"
          :rowName="row.name"
          :key="`${name}-${row.rowName}-${seat.seat}`">
    </Seat>
  </div>
</template>

<script>
  import Seat from './Seat'

  export default {
    name: "row",
    props: ['row', 'name'],
    components: {
      Seat
    }
  }
</script>

<style scoped>
  .row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0.5em;
  }
</style>
