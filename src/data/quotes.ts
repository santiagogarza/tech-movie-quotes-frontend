import type { Decade, Quote } from "../lib/types";

/**
 * Baseline catalog used when the optional backend is not reachable.
 * 5 quotes per decade, 25 total. The backend (when running) returns
 * 15 per decade including these as a subset, so the demo feels continuous
 * when you start the backend mid-session.
 */
export const LOCAL_QUOTES: Record<Decade, Quote[]> = {
  "70s": [
    { decade: "70s", year: 1973, movie: "Westworld", quote: "Nothing can possibly go wrong." },
    { decade: "70s", year: 1973, movie: "Soylent Green", quote: "Soylent Green is people!" },
    { decade: "70s", year: 1976, movie: "Logan's Run", quote: "There is no sanctuary." },
    {
      decade: "70s",
      year: 1977,
      movie: "Star Wars",
      quote: "These aren't the droids you're looking for.",
    },
    {
      decade: "70s",
      year: 1979,
      movie: "Alien",
      quote: "In space, no one can hear you scream.",
    },
  ],
  "80s": [
    { decade: "80s", year: 1982, movie: "Tron", quote: "Greetings, programs!" },
    { decade: "80s", year: 1983, movie: "WarGames", quote: "Shall we play a game?" },
    { decade: "80s", year: 1984, movie: "The Terminator", quote: "I'll be back." },
    {
      decade: "80s",
      year: 1985,
      movie: "Back to the Future",
      quote: "Roads? Where we're going, we don't need roads.",
    },
    { decade: "80s", year: 1986, movie: "Short Circuit", quote: "Number Five is alive!" },
  ],
  "90s": [
    { decade: "90s", year: 1991, movie: "Terminator 2", quote: "Hasta la vista, baby." },
    { decade: "90s", year: 1992, movie: "Sneakers", quote: "Too many secrets." },
    { decade: "90s", year: 1993, movie: "Jurassic Park", quote: "Hold onto your butts." },
    { decade: "90s", year: 1995, movie: "Hackers", quote: "Hack the planet!" },
    { decade: "90s", year: 1999, movie: "The Matrix", quote: "There is no spoon." },
  ],
  "2000s": [
    { decade: "2000s", year: 2002, movie: "Minority Report", quote: "Everybody runs." },
    {
      decade: "2000s",
      year: 2004,
      movie: "I, Robot",
      quote: "You are experiencing a car accident.",
    },
    { decade: "2000s", year: 2005, movie: "Serenity", quote: "I aim to misbehave." },
    { decade: "2000s", year: 2008, movie: "Iron Man", quote: "I am Iron Man." },
    { decade: "2000s", year: 2009, movie: "Avatar", quote: "I see you." },
  ],
  "2010s": [
    { decade: "2010s", year: 2010, movie: "Tron: Legacy", quote: "It's bio-digital jazz, man." },
    {
      decade: "2010s",
      year: 2010,
      movie: "Inception",
      quote: "You mustn't be afraid to dream a little bigger, darling.",
    },
    {
      decade: "2010s",
      year: 2013,
      movie: "Her",
      quote: "I've never loved anyone the way I loved you.",
    },
    {
      decade: "2010s",
      year: 2014,
      movie: "Ex Machina",
      quote: "Isn't it strange to create something that hates you?",
    },
    {
      decade: "2010s",
      year: 2015,
      movie: "The Martian",
      quote: "I'm gonna have to science the shit out of this.",
    },
  ],
};
