"use client";

import Card from "@/components/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DatePickerWithRange } from "@/components/ui/datepicked";
import {
  faArrowDown,
  faArrowUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
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
    const response = await axios.post("http://localhost:3001/search/movie", {
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
          Incroyable projet pour trouver les meilleurs
          <code className="font-mono font-bold ml-1"> films</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Kevin Lemniai <FontAwesomeIcon icon={faStar} />
          </a>
        </div>
      </div>

      <form className="w-[30%] mt-10">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Cherchez un film.."
          className="bg-gray-100 p-2 rounded-lg searchbar w-[100%]"
        />
      </form>

      <div className="bg-gray-300 text-gray-800 p-8 rounded-2xl w-[85%] flex flex-row items-center justify-center m-10 ">
        <div className="self-start pt-20 w-[60%] flex flex-col gap-2">
          <button
            className="text-center gap-2 text-black font-semibold"
            onClick={() => {
              setFilter([]), setDate({ from: undefined, to: new Date() });
            }}
          >
            Reset Filters
          </button>
          <Collapsible>
            <CollapsibleTrigger
              onClick={() => setArrowDirection(!arrowDirection)}
              className="text-center font-semibold flex flex-row items-center gap-2"
            >
              Genres{" "}
              {arrowDirection ? (
                <FontAwesomeIcon icon={faArrowDown} />
              ) : (
                <FontAwesomeIcon icon={faArrowUp} />
              )}{" "}
            </CollapsibleTrigger>
            <CollapsibleContent>
              {GENRES.map((el) => (
                <div key={el} className="flex items-center gap-2 font-semibold">
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
          </Collapsible>
          <div>
            <p className="flex items-center gap-2 text-black font-semibold">
              Release Date{" "}
            </p>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </div>
        <div>
          <p className="text-center mb-5 font-mono font-medium">
            Movies : {movies && movies.estimatedTotalHits} found in{" "}
            {movies && movies.processingTimeMs} ms
          </p>
          <div className="w-[100%] flex flex-row items-between gap-3 flex-wrap">
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

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Retrouvez moi{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Mettre liens github et linkeding
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
