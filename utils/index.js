var fs = require('fs');
const readline = require('readline');
const getRandomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 *
 * @param {Number} nbRank Number of rank
 * @param {Number} nbSections Number of sections
 * @param {{lower: Number, upper: Number}} nbRows Range for the number of rows (between lower and upper)
 * @param {{lower: Number, upper: Number}} nbSeats Range for the number of seats (between lower and upper)
 * @returns { } {
 *  structure: {
 *      byRank: [] Array of 3-uplet [section number, row number, seat number]
 *  },
 *  totalSeats: number of seats generated,
 *  layout: layout structure accordind to the documentation
 * }
 */
const layoutGenerator = (nbRank, nbSections, nbRows, nbSeats) => {
    const structure = {byRank: {}};
    const ranks = []
    let totalSeats = 0;
    for (var i = 0; i < nbRank; i++) {
        ranks.push(`rank${i}`)
    }

    const sectionArray = []
    for (var j = 0; j < nbSections; j++) {
        const name = `section${j}`
        const rowsCount = getRandomBetween(nbRows.lower, nbRows.upper)
        const rowsArrays = []
        for (var k = 0; k < rowsCount; k++) {
            const currentRow = {}
            currentRow.row = k
            const seatsCount = getRandomBetween(nbSeats.lower, nbSeats.upper)
            const seatsArray = []
            for (var l = 0; l < seatsCount; l++) {
                const rank = ranks[getRandomBetween(0, ranks.length - 1)];
                seatsArray.push({
                    seat: l,
                    rank
                })
                if (!structure.byRank[rank]) {
                    structure.byRank[rank] = [];
                }
                structure.byRank[rank].push([j, k, l]);
                totalSeats++;
            }
            currentRow.seats = seatsArray
            rowsArrays.push(currentRow)

        }

        sectionArray.push({
            name,
            rows: rowsArrays
        })
    }
    return {
        structure,
        totalSeats,
        layout: {
            ranks,
            sections: sectionArray
        }
    }
}
/**
 *
 * @param {*} byRank See layoutGenerator for structure
 * @returns Return the groups data strcture according to the dcumentation
 */
const groupsGenerator = (byRank) => {
    // Divide each rank places into 2 groups ( all member of a group can only be in 1 unique rank)
    const rankKeys = Object.keys(byRank);
    const sizeArr = rankKeys.map((rankKey) => {
        return {id: rankKey, size: byRank[rankKey].length}
    }, [])
    const partitionArr = sizeArr.map(({id, size}) => {
        const r = getRandomBetween(1, size);
        return {id, part: [size - r, r]}
    })
    const arr = [];
    for (let k = 0; k < partitionArr.length; k++) {
        const {id, part} = partitionArr[k];
        const copyArr = [...byRank[id]];

        const group1 = part[0];
        const group1Arr = [];
        for (let i = 0; i < group1; i++) {
            const position = copyArr.pop();
            const section = `section${position[0]}`;
            const row = position[1];
            const seat = position[2];
            group1Arr.push({section, row, seat});
        }
        const group2 = part[1];
        const group2Arr = [];
        for (let j = 0; j < group2; j++) {
            const position = copyArr.pop();
            const section = `section${position[0]}`;
            const row = position[1];
            const seat = position[2];
            group2Arr.push({section, row, seat});
        }
        arr.push(group1Arr);
        arr.push(group2Arr)
    }
    return arr.map((seatsArr, index) => {
        return {
            id: index,
            seats: seatsArr
        }
    })

}

const askQuestion = (nbRanks, nbSections, rows, seats) => {
    console.log(`This will generate between ${nbSections * rows.lower * seats.lower} and  ${nbSections * rows.upper * seats.upper} seats `)

    rl.question('Proceed anyway ? (y/n) ', (answer) => {
        // TODO: Log the answer in a database
        rl.close();
        switch (answer) {
            case 'y':
                launchGeneration(nbRanks, nbSections, rows, seats);
                return;
            case 'n':
                return;
            default:
                console.log('Try again');
                askQuestion(nbRanks, nbSections, rows, seats);
        }

    });
}

const launchGeneration = (nbRanks, nbSections, rows, seats) => {
    const data = layoutGenerator(nbRanks, nbSections, rows, seats);

    fs.writeFileSync('layout.json', JSON.stringify(data.layout, null, 2));
    fs.writeFileSync('groups.json', JSON.stringify(groupsGenerator(data.structure.byRank), null, 2));

    console.log(`Generated ${nbRanks} ranks.`)
    console.log(`Generated ${nbSections} sections.`)
    console.log(`Generated between ${rows.lower} and ${rows.upper} rows per section.`)
    console.log(`Generated between ${seats.lower} and ${seats.upper} seats pers rows..`)
    console.log(`Total: ${data.totalSeats} seats generated.`)
}

const nbRanks = 5;
const nbSections = 10;
const rows = {lower: 40, upper: 50};
const seats = {lower: 100, upper: 150};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
askQuestion(nbRanks, nbSections, rows, seats);
