# OBA-API 📚

With this CLI app you can filter the data from the OBA api by Gerne, Author, Decenia, and amount of pages

- [OBA-API 📚](#oba-api---)
  * [Getting Started 🎬](#getting-started---)
  * [Prerequisites](#prerequisites)
  * [Installation 💾](#installation---)
  * [Running 🏃‍♂️](#running------)
  * [Linting ✨](#linting--)
  * [Built With 🛠️](#built-with----)
  * [Data struggles](#data-struggles)
    + [Issue's DirtyData 🛁](#issue-s-dirtydata---)
    + [Data Nesting 🐦](#data-nesting---)
    + [Data output example 📝](#data-output-example---)
        * [Standard use object](#standard-use-object)
        * [Calculated to meters examples📝](#calculated-to-meters-examples--)
  * [Research questions❓](#research-questions-)
    + [Hypothesis](#hypothesis)
      - [Sub-questions](#sub-questions)
        * [Questions later added](#questions-later-added)
    + [Research questions findings ❓](#research-questions-findings--)
  * [Visualization 👀](#visualization---)
    + [Concept drawing ✏️](#concept-drawing---)
    + [Wireframes ✏️](#wireframes---)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments and Thanks](#acknowledgments-and-thanks)
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

## Linting ✨

For linting i used Prettier
To run the Prettier use the code below

-   `npm run clean`

## Built With 🛠️

-   [OBA](https://www.oba.nl/) - OBA
-   [D3](https://d3js.org/) - D3
-   [Prettier](https://prettier.io/docs/en/options.html) - Prettier.io - Linter
-   [Observablehq](https://beta.observablehq.com) - Observablehq gebruikt voor visuals

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

### Data output example 📝
##### Standard use object
Dit id hoe de data er ongeveer uit zal zien.
```
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
```
##### Calculated to meters examples📝
```
{ meter: 53, compare: 'politieke-roman' },
  { meter: 87, compare: 'protestants-milieu' },
  { meter: 403, compare: 'psychologisch-verhaal' }
  ```

## Research questions❓

### Hypothesis

**How high would a tower of all books be?**

#### Sub-questions
1. How many pages do all the pages have?
2. How do you calculated the size of all combined pages?
3. How thick is the binding of a average book
4. Which objects / Landmarks will i use to compare the height?

##### Questions later added
At first i thought the previous questions didn't give enough inside in the visualization of the books. So i added some question about the amount of forest needed to get cut down.
This will give a more indepth visual.

- How many book pages do you get from a average tree?
- How many trees are there in the "vondelpark?"

### Research questions findings ❓

1.  **How many pages does a book have?**
  - The average is about 400

2.  **How do you calculated the thickness of a book?**
-   This is the calculation for the size of an average book
-   ```var bookmeters = parseInt((amount * 400 / 131 + amount * 0.5) / 100, 10)```

3.  **What is the size of the binding?**
  - The binding is 0.5CM in total (See pic)
  <details>
  <summary>Picture</summary>
  Picture of me doing research about the binding
  ![Spine Research](https://github.com/MartijnReeuwijk/frontend-data/tree/master/assets/img/spine.jpg)
  </details>

4.  **Which objects / Landmarks will i use to compare the height?**
  - A famous writer (1.7m)
  - OBA ??
  - Statue of liberty (93m)
  - Eifel tower (300m)
  - Christ the Redeemer (30m)

5. **How many book pages do you get from a average tree**
  - 152mm x 229mm book -> 34808 mm2 surface
  - 215.9mm x 279.4mm -> 60322.46mm2 surface
  - 42.3% more than a A4 - 142.3% so 11858 pages.

6. **How many trees are there in the "vondelpark?"**
  - Amsterdam counted the trees in the vondelpark there are 255 trees there
  - Source [Bron](http://www.inhetvondelpark.nl/bomenlijst.html)


## Visualization 👀
For the visualization I will compare the stack of books with famous landmarks and writers.
Also i compare the genres and how many trees it took to makes all the books.
- In the end i was notable to fill a bar with a image this makes it look less fancy

### Wireframes✏️
![Drawing one ](https://github.com/MartijnReeuwijk/frontend-data/tree/master/assets/img/drawingone.jpg)
![Drawing two ](https://github.com/MartijnReeuwijk/frontend-data/tree/master/assets/img/drawingtwo.jpg)


## Authors

-   **Martijn Reeuwijk** - [MartijnReeuwijk](https://github.com/MartijnReeuwijk)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments and Thanks

-   Tech-treck squad
-   Thanks to [Jsonformatter](https://jsonformatter.curiousconcept.com/) by helping me better understand the data structure.
-   Bas Pieren [Github](https://github.com/BasPieren/)
