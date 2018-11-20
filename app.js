const OBA = require("oba-api");
const client = new OBA({
  public: "1e19898c87464e239192c8bfe422f280"
});

client
  .get("search", {
    q: "format:book",
    sort: "title",
    // facet: ['genre(Detective )', 'type(book)'],
    refine: true,
    librarian: true,
    page: 3
  })

  .then(results => JSON.parse(results))
  .then(results => {
    client
      .get("refine", {
        rctx:
          "AWNkYOZmYGcwzDfMKiouLTY1TKooNUrLLkzNLEysKMnIZGZk4MxNzMxjYGYQT8svyk0ssUrKz8@mBBGMzNKZ8UWpycUFqUUFiemprEYGTAwPzjHeKr9VznSvj4lR40gGIwMDe35SIgMDg6J$UX5$iX5OZmFpZoo$UIy9tCiHgTUvhxEA",
        count: 100
      })
      .then(response => JSON.parse(response))
      .then(response => {
        let metadata = response.aquabrowser.facets.facet;
        let genre_object = [];
        let genreCounts = metadata.find(item => item.id == "Genre").value;
        genreCounts = genreCounts.map(genre => {
          return {
            count: genre.count,
            genre: genre.id
          };
        });
        console.log(genreCounts);
        let genre_book_meters = bookthickness(genreCounts);
      });

    // let raw_data = raw_json(results)
    // let core_data = core_json(results)
    // let auteurs = get_auteurs(core_data)
    // let book_object = create_book_obj(core_data)
    //
    // let add_a_decennium = add_decennium(book_object)

    // Filter functions
    // let filter_by_decennium = filter_decennium(add_a_decennium)
    // let filter_by_genre = filter_genre(add_a_decennium)
    // let filter_by_author = filter_author(add_a_decennium)

    // bookthickness(1000)
  })
  .catch(err => console.log(err)); // Something went wrong in the request to the API

function raw_json(results) {
  // console.log(results);
}

function core_json(results) {
  let core_json = results.aquabrowser.results.result;
  return core_json;
}

function get_auteurs(data) {
  let all_authors = data.map(data => data.authors);
  // console.log(all_authors)
  return all_authors;
}

function create_book_obj(data) {
  let boek = [];
  data.forEach(data => {
    const calcPages =
      typeof data.description === "undefined" ||
      typeof data.description["physical-description"] === "undefined"
        ? "Geen pages"
        : parseInt(
            data.description["physical-description"]["$t"]
              .match(/\d+/g)
              .map(Number),
            10
          );

    boek.push({
      title:
        typeof data.titles["short-title"] === "undefined"
          ? "Geen title"
          : data.titles["short-title"]["$t"],
      author:
        typeof data.authors === "undefined" ||
        typeof data.authors["main-author"]["search-term"] === "undefined"
          ? "Geen author"
          : data.authors["main-author"]["search-term"],
      publisher:
        typeof data.publication === "undefined" ||
        typeof data.publication.publishers === "undefined" ||
        typeof data.publication.publishers.publisher["search-term"] ===
          "undefined"
          ? "Geen uitgever"
          : data.publication.publishers.publisher["search-term"],
      genre:
        typeof data.genres === "undefined" ||
        typeof data.genres.genre === "undefined"
          ? "Geen genre"
          : data.genres.genre["search-term"],
      releasedate:
        typeof data.publication === "undefined" ||
        typeof data.publication.year["search-term"] === "undefined"
          ? "Geen releasedate"
          : data.publication.year["search-term"],
      decennium: "",
      pages: calcPages,
      bookthickness: parseInt(
        ((calcPages * 400) / 131 + calcPages * 0.5) / 100,
        10
      ),
      id:
        typeof data.id["$t"] === "undefined" || typeof data.id === "undefined"
          ? "Ik heb geen id"
          : data.id["$t"],
      oba_url:
        typeof data.frabl["detail-page"] === "undefined" ||
        typeof data.frabl === "undefined"
          ? "https://www.oba.nl/home.html"
          : data.frabl[0]["detail-page"]
      // cover: (typeof data.coverimages === "undefined" ||
      //     typeof data.coverimages.coverimage === "undefined") ? // Cover is een array die ik nog moet mappen
      //   "http://www.placecage.com/c/100/200" : data.coverimages.coverimage[0]["$t"]
    });
  });
  return boek;
}

function add_decennium(boeken) {
  boeken = boeken.map(boek => {
    boek.decennium = boek.releasedate.charAt(2) + "0s";
    return boek;
  });
  return boeken;
}

function filter_decennium(boeken) {
  boeken.forEach(boek => {
    if (boeken[boek.decennium]) {
      boeken[boek.decennium].push(boek);
    } else {
      boeken[boek.decennium] = [boek];
    }
  });
  return boeken;
}

function filter_genre(boeken) {
  boeken.forEach(boek => {
    if (boeken[boek.genre]) {
      boeken[boek.genre].push(boek);
    } else {
      boeken[boek.genre] = [boek];
    }
  });
  return boeken;
}

function filter_author(boeken) {
  boeken.forEach(boek => {
    if (boeken[boek.author]) {
      boeken[boek.author].push(boek);
    } else {
      boeken[boek.author] = [boek];
    }
  });
  return boeken;
}

function count_author(author) {
  // console.log(author);
  //   console.log(author.map(a => a.author));
}

function bookthickness(genres) {
  let booksinmeters = [];

  // This function uses avarage pages
  genres.forEach(boeken => {
    var bookmeters = parseInt(
      ((boeken.count * 400) / 131 + boeken.count * 0.5) / 100,
      10
    );
    booksinmeters.push({book:"true", meter: bookmeters, compare: boeken.genre });
  });
  console.log(booksinmeters);
}
