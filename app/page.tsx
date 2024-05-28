"use client";

import Card from "@/components/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DatePickerWithRange } from "@/components/ui/datepicked";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import axios from "axios";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface Movie {
  externalId: string;
  isAdult: boolean;
  originalLanguage: string;
  overviewEn: string;
  overviewFr: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  titleEn: string;
  titleFr: string;
  voteAverage: number;
}

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [arrowDirection, setArrowDirection] = useState(false);
  const [filter, setFilter] = useState([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: new Date(),
  });

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchMovies = async () => {
    const response = await axios.post("http://localhost:4000/search/movie", {
      text: search,
      filters: filter,
      date: date,
    });
    setMovies(response.data);
  };

  useEffect(() => {
    fetchMovies();
  }, [search, filter, date]);

  useEffect(() => {
    if (
      (date?.to !== undefined && date?.from !== undefined) ||
      (date?.to === undefined && date?.from === undefined)
    ) {
      fetchMovies();
    }
  }, [date]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    console.log(date);
  }, [date]);

  console.log(filter);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Indexation de 10000 avec
          <code className="font-mono font-bold ml-1"> Meilisearch</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.kevinlemniai.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Kevin Lemniai
          </a>
        </div>
      </div>

      <form className="w-[50%] lg:w-[40%] mt-10">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Cherchez un film.."
          className="bg-gray-100 p-2 rounded-lg searchbar w-[100%]"
        />
      </form>

      <div className="bg-gray-300 text-gray-800 p-8 rounded-2xl w-[85%] flex flex-col xl:flex-row items-center justify-center m-10 ">
        <div className="xl:self-start pt-20 w-[80%] md:w-[65%] lg:w-[40%] flex flex-col gap-2 items-center xl:items-start">
          <button
            className="text-center gap-2 text-black font-semibold"
            onClick={() => {
              setFilter([]), setDate({ from: undefined, to: new Date() });
            }}
          >
            Reset Filters
          </button>
          <Collapsible className="flex w-full justify-center xl:justify-start items-center">
            <div>
              <CollapsibleTrigger
                onClick={() => setArrowDirection(!arrowDirection)}
                className="w-full font-semibold flex flex-row items-center xl:items-center justify-center xl:justify-start gap-2"
              >
                Genres{" "}
                {arrowDirection ? (
                  <FontAwesomeIcon icon={faArrowDown} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUp} />
                )}{" "}
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col align-center xl:align-start ml-6 xl:ml-0">
                {GENRES.map((el) => (
                  <div
                    key={el}
                    className="flex items-center xl:justify-start gap-2 font-semibold"
                  >
                    <Checkbox
                      checked={filter[el] ? true : false}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          [el]: !filter[el],
                        })
                      }
                    />
                    <p>{el}</p>
                  </div>
                ))}
              </CollapsibleContent>
            </div>
          </Collapsible>
          <div className="w-full flex flex-col items-center xl:items-start">
            <p className="flex items-center gap-2 text-black font-semibold">
              Release Date{" "}
            </p>
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              className="position: absolute;"
            />
          </div>
        </div>
        <div>
          <p className="text-center mb-5 font-mono font-medium">
            Movies : {movies && movies.estimatedTotalHits}
            {movies && movies.estimatedTotalHits === 1000 && "+"} found in{" "}
            {movies && movies.processingTimeMs} ms
          </p>
          <div className="w-[100%] flex flex-row items-between justify-center gap-3 flex-wrap">
            {movies.hits &&
              movies.hits.length > 0 &&
              movies.hits.map((movie) => (
                <Card
                  width={160}
                  minHeight={60}
                  key={movie.externalId}
                  externalId={movie.externalId}
                  isAdult={movie.isAdult}
                  originalLanguage={movie.originalLanguage}
                  overviewEn={movie.overviewEn}
                  overviewFr={movie.overviewFr}
                  popularity={movie.popularity}
                  posterPath={movie.posterPath}
                  releaseDate={movie.releaseDate}
                  titleEn={movie.titleEn}
                  titleFr={movie.titleFr}
                  voteAverage={movie.voteAverage}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="mb-32 flex justify-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://www.kevinlemniai.fr/project"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Portfolio{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Retrouvez mes autres projets ici !
          </p>
        </a>

        <a
          href="https://github.com/KevinLmn/movies-index-front"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Github Front{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Le code du front est disponible ici
          </p>
        </a>

        <a
          href="https://github.com/KevinLmn/movies-index-back"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Github Back{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Le code du back est disponible ici
          </p>
        </a>
      </div>
    </main>
  );
}
