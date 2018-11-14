# OBA-API 📚

With this CLI app you can filter the data from the OBA api by Gerne, Author, Decenia, and amount of pages

-   [OBA-API 📚](#oba-api---)
    -   [Getting Started 🎬](#getting-started---)
    -   [Prerequisites](#prerequisites)
    -   [Installation 💾](#installation---)
    -   [Running 🏃‍♂️](#running------)
    -   [Built With 🛠️](#built-with----)
    -   [Data struggles](#data-struggles)
        -   [Issue's DirtyData 🛁](#issue-s-dirtydata---)
        -   [Data Nesting 🐦](#data-nesting---)
        -   [Data output exemple 📝](#data-output-exemple---)
    -   [Research questions❓](#research-questions-)
        -   [Hypothesis](#hypothesis)
        -   [Research questions findings ❓](#research-questions-findings--)
    -   [Visualization 👀](#visualization---)
        -   [Concept drawing ✏️](#concept-drawing---)
    -   [Other files](#other-files)
    -   [Authors](#authors)
    -   [License](#license)
    -   [Acknowledgments and Thanks](#acknowledgments-and-thanks)

## Getting Started 🎬

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You will need the following things properly installed on your computer.

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/) (with npm)
-   [Google Chrome](https://google.com/chrome/)

## Installation 💾

-   `git@github.com:MartijnReeuwijk/functional-programming.git`
-   `cd functional-programming`
-   `npm install rijkvanzanten/node-oba-api`
-   `npm install`

## Running 🏃‍♂️

For now its just a CLI client app
Just run the "app" by using this line of code inside the correct folder

-   `Node app.js`

## Built With 🛠️

-   [OBA](https://www.oba.nl/) - OBA
-   [D3](https://d3js.org/) - D3
-   [Observablehq](https://beta.observablehq.com) - Observablehq Used to test D3 and make the visuals

## Data struggles

### Issue's DirtyData 🛁

The data we get from the OBA-api is "dirty" some keys have no values and sometimes the keys just don't exist.
I never really heard of this concept before, but i think i handeld it pretty well.
I started by rebuilding the code to my own objects so i could easy acesss them.
This is the part of code i learned the most from.

    pages: (typeof data.description === "undefined" ||
    typeof data.description['physical-description'] === "undefined") ?
    "Geen pages" : parseInt(data.description['physical-description']['$t'].match(/\d+/g).map(Number), 10)

I made this piece of code since the Oba sometimes used Roman Numerals to express pages. This piece of code removes the Roman Numerals so only the regular number remain.

### Data Nesting 🐦

Another problem was that the data is deeply nested so you need to go way to deep until you can select the books / results.
I solved this problem by the use of separate function that return the book results

    function core_json(results) {
    let core_json = results.aquabrowser.results.result;
    return core_json;
    }

I kept the results in a let instead of a straight return so i could console.log it easily to look at the data structure.
This will keep the rest of the Code cleaner.

### Data output exemple 📝

The data output should look something like this

        {
          title: 'Bewijs het maar',
          author: 'Rudy Soetewey',
          publisher: 'Uitgeverij Kramat',
          genre: 'Thriller',
          releasedate: '2015',
          decennium: '',
          pages: 339,
          bookstickness: 4cm,
          id: '|oba-catalogus|1130214',
          oba_url: 'https://www.oba.nl/home.html'
          }

## Research questions❓

### Hypothesis

**Hoe veel meter aan boeken heeft de OBA**

#### Sub-questions


### Research questions findings ❓

1.  **Hoe veel paginas per boek**
  - Gemiddelde van paginas is 400

2.  **Bereken de meters**
-   Zo bereken je de hoeveelheid meter de boeken zijn met gemiddelde aantal paginas
-   ```var bookmeters = parseInt((amount * 400 / 131 + amount * 0.5) / 100, 10)```

3.  **Hoe breed is een kaft?**
  - Een kaft is gemiddeld 0.5cm Zie onderzoeks foto

4.  **Waar ga ik de hoogte me vergelijken?**
  - Schrijver (1.7m)
  - OBA (Mail klantenserv)
  - Vrijheidsbeeld (93m)
  - Eifeltoren (300m)
  - Christ the Redeemer (30m)
5. **Hoe veel pages krijg je uit een boom?**
  - 152mm x 229mm boekie
  - 34808 mm2
  - 215.9mm by 279.4mm
  - 60322.46
  - 42.3% meer van a4 naar boek size
  - 0.7 / 0.8



## Visualization 👀


### Concept drawing ✏️


## Authors

-   **Martijn Reeuwijk** - [MartijnReeuwijk](https://github.com/MartijnReeuwijk)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments and Thanks

-   Tech-treck squad
-   Thanks to [Jsonformatter](https://jsonformatter.curiousconcept.com/) by helping me better understand the data structure.
-  Bas Pieren [Github](https://github.com/BasPieren/)
