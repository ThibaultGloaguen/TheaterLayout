# Theater layout vizualisation

```

This application allows to visualize the seat layout of a theater as well as the placement of different group of person
It takes two inputs: 
    - layout.json: the actual layout of the room with the number of section ,rows, seats
    - groups.json: the structure that define where every group of pepole seat in the room

Make sure you put the two inputs in the assets dir before launching the application. 

```
## Explication
```

When the application launches, the Theater view mounts and transforms the basic structure composed of arrays into a structure composed only of objects.
This allows me to modify and browse the structure more easily and so can dispatch the data to different components easily.

In the createTheaterLayoutStructure function, as I iterate through the layout structure, I associate a randomly calculated color with the different ranks available.

Once my new layout structure is generated, I populate the layout with the groups.json data and I generate the color legend for groups and ranks.
This treatment happens in the populateTheaterWithSample function.
This function iterate over the differents group of people and create for each group, a unique random color, and populate the seat in the layout theater with the groupId and the groupColor.
```
## Project setup
```
npm install
```

### Run the project
```
npm run serve
```

### Run the unit tests
```
npm run test:unit
```
