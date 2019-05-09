<template>
  <div class="theater">
    <div class="sections">
      <section-theater v-for="section in theaterLayout"
                       :section="section"
                       :key="section.name">
      </section-theater>
    </div>
    <legend-theater :legendMap="legendMap">
    </legend-theater>
  </div>
</template>


<script>
  import Section from "../components/Section"
  import Legend from "../components/Legend"

  export default {
    name: "home",
    props: {layoutProp: {type: Object}, groupsProp: {type: Array}},
    components: {
      "section-theater": Section,
      "legend-theater": Legend
    },
    methods: {
      getRandomColor: function () {
        return (
          "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        );
      },
      /**
       * Transform the already existing structure into a full object structure ( no arrays)
       * This new structure could be useful for further manipulation on the seat ( no need to iterate through an array
       * of rows or seats, data can be accessed directly)
       */
      createTheaterLayoutStructure: function () {
        var nbElementTorender = 0
        // First create color rank structure map
        const begin = Date.now();
        this.legendMap.rankColor = this.layout.ranks.reduce((acc, rank) => {
          return {
            ...acc,
            [rank]: this.getRandomColor()
          };
        }, {});

        // Then create the theater layout structure which is full object (no arrays)
        const nbSections = this.layout.sections.length
        const newLayout = this.layout.sections.reduce((acc, {name, rows}) => {
          // init entry in sections structure
          if (!acc[name]) {
            acc[name] = {
              name,
              rows: {}
            };
          }
          const nbRows = rows.length
          acc[name].rows = rows.reduce((rowsAcc, {row, seats}) => {
            // init entry in rows structure
            if (!rowsAcc[row]) {
              rowsAcc[row] = {
                row,
                seats: {}
              };
            }
            const nbSeats = seats.length * nbRows
            nbElementTorender += nbSeats + nbRows + 1
            rowsAcc[row].seats = seats.reduce((seatsAcc, {seat, rank}) => {
              // init entry in seats structure
              seatsAcc[seat] = {
                seat,
                rank,
                rankColor: this.legendMap.rankColor[rank]
              };
              return seatsAcc;
            }, {});
            return rowsAcc;
          }, {});
          return acc;
        }, {});
        const end = Date.now();
        if (nbElementTorender > 500000 && nbSections > 1) {
          this.theaterLayoutTooBig = true
        }
        this.theaterLayout = newLayout;
      },
      populateTheaterWithSample: function () {
        // Iterate through every groups
        for (let i = 0; i < this.groups.length; i++) {
          const {id, seats} = this.groups[i];
          // Create color legend fot this id if it desont already exist
          if (!this.legendMap.groupColor[id]) {
            this.legendMap.groupColor[id] = this.getRandomColor();
          }
          // Iterate through every seats for a given group
          for (let j = 0; j < seats.length; j++) {
            const {section, row, seat} = seats[j];
            // Add id and color of the group for the selected seat in the transformed theatre structure
            this.theaterLayout[section].rows[row].seats[seat] = {
              ...this.theaterLayout[section].rows[row].seats[seat],
              groupId: id,
              groupColor: this.legendMap.groupColor[id]
            };
          }
        }
      }
    },
    mounted: function () {
      // This structure get rid of arrays to get instant access to desire data
      this.layout = this.layoutProp;
      this.groups = this.groupsProp;
      this.createTheaterLayoutStructure();
      this.populateTheaterWithSample();
    },
    data: function () {
      return {
        /**
         * Structure of the theater layout
         * {
       *    [section]: {
       *        name,
       *        rows : {
       *         [row] : {
       *          row,
       *          seats: {
       *            [seat]: {
       *              seat,
       *              groupId,
       *              groupColor,
       *              rank,
       *              rankColor
       *            }
       *          }
       *         }
       *        }
       *     }
       * }
         */
        indexSection: 0,
        theaterLayoutTooBig: false,
        theaterLayout: {},
        legendMap: {
          groupColor: {},
          rankColor: {}
        },
        groups: [],
        layout: {}
      };
    }
  };
</script>

<style>
  .theater {
    display: flex;
    max-width: 100vw;
  }

  .sections {
    width: 80%;
  }
</style>
