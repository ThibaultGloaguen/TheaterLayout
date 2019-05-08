<template>
  <div class="theater">
    <div class="sections">
      <div class="section" v-for="section in layout.sections">
        {{section.name}}
        <div class="row" v-for="row in section.rows">
          <div :ref="getRefSeat(section,row, seat)" :class="seatClass(seat.rank)"
               v-for="seat in row.seats">
          </div>
        </div>
      </div>
    </div>
    <div class="legend">
      <div v-for="group in groups" style="display: flex;padding: 1em;justify-content: space-evenly">
        <div :ref="group.id" class="square"></div>
        <div>Group ID: {{group.id}}</div>
      </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'home',
    methods: {
      getGroupColor: function () {

      },
      getRandomColor: function () {
        return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
      },
      getRefSeat: function (section, row, seat) {
        return (section.name + '_' + row.row + '_' + seat.seat)
      },
      setSeatForGroup: function () {
        this.groups.forEach((group) => {
          let groupColor = this.getRandomColor()
          group.seats.forEach((seat) => {
            let currentSeat = this.$refs[seat.section + '_' + seat.row + '_' + seat.seat]
            let groupLegend = this.$refs[group.id]
            currentSeat[0].style.backgroundColor = groupColor
            groupLegend[0].style.backgroundColor = groupColor
          })
        })
      },
      seatClass: function (rank) {
        if (rank === 'rank1') {
          return 'first-rank'
        } else if (rank === 'rank2') {
          return 'second-rank'
        } else {
          return 'third-rank'
        }
      }
    },
    mounted: function () {
      this.setSeatForGroup()
    },
    data: function () {
      return {
        groups: [
          {
            id: '+31611111111', seats: [
              {section: 'main hall', row: '1', seat: '4'},
              {section: 'main hall', row: '1', seat: '2'},
              {section: 'main hall', row: '2', seat: '2'},
              {section: 'main hall', row: '2', seat: '4'},
            ]
          },
          {
            id: '+31622222222', seats: [
              {section: 'main hall', row: '2', seat: '6'},
              {section: 'main hall', row: '2', seat: '5'},
            ]
          },
        ],
        layout: {
          ranks: ['rank1', 'rank2', 'rank3'],
          sections: [
            {
              name: 'main hall',
              rows: [
                {
                  row: '1', seats: [
                    {seat: '1', rank: 'rank1'},
                    {seat: '3', rank: 'rank1'},
                    {seat: '4', rank: 'rank1'},
                    {seat: '2', rank: 'rank1'}
                  ]
                },
                {
                  row: '2', seats: [
                    {seat: '1', rank: 'rank1'},
                    {seat: '3', rank: 'rank1'},
                    {seat: '5', rank: 'rank1'},
                    {seat: '6', rank: 'rank1'},
                    {seat: '4', rank: 'rank1'},
                    {seat: '2', rank: 'rank1'}
                  ]
                },
                {
                  row: '3', seats: [
                    {seat: '1', rank: 'rank2'},
                    {seat: '3', rank: 'rank2'},
                    {seat: '5', rank: 'rank2'},
                    {seat: '6', rank: 'rank2'},
                    {seat: '4', rank: 'rank2'},
                    {seat: '2', rank: 'rank2'}

                  ]

                },
              ]
            },
            {
              name: '1st ba',
              rows: [
                {
                  row: '1', seats: [
                    {seat: '1', rank: 'rank1'},
                    {seat: '3', rank: 'rank1'},
                    {seat: '4', rank: 'rank1'},
                    {seat: '2', rank: 'rank1'}
                  ]
                },
                {
                  row: '2', seats: [
                    {seat: '1', rank: 'rank1'},
                    {seat: '3', rank: 'rank1'},
                    {seat: '5', rank: 'rank1'},
                    {seat: '6', rank: 'rank1'},
                    {seat: '4', rank: 'rank1'},
                    {seat: '2', rank: 'rank1'}
                  ]
                },
                {
                  row: '3', seats: [
                    {seat: '1', rank: 'rank2'},
                    {seat: '3', rank: 'rank2'},
                    {seat: '5', rank: 'rank2'},
                    {seat: '6', rank: 'rank2'},
                    {seat: '4', rank: 'rank2'},
                    {seat: '2', rank: 'rank2'}

                  ]

                },
              ]
            },
          ]
        }
      }
    }
  }
</script>

<style>
  .square {
    width: 20px;
    height: 20px;
    background-color: red;
  }

  .theater {
    display: flex;
  }

  .sections {
    width: 80%;
  }

  .legend {
    width: 20%;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

  .first-rank {
    height: 1em;
    margin: 1em;
    width: 100%;
    border: 2px solid green;
  }

  .second-rank {
    height: 1em;
    margin: 1em;
    width: 100%;
    border: 2px solid aqua;
  }

  .third-rank {
    height: 1em;
    margin: 1em;
    width: 100%;
    border: 2px solid fuchsia;
  }

</style>
