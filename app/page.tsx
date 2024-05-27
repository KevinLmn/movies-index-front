'use client'

import Card from "@/components/Card";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const fetchMovies = async () => {
    const response = await axios.post("http://localhost:3001/search/movie", {
      text : search
    })
    setMovies(response.data);
  }


  useEffect(() => {
    fetchMovies();
  }, [search]);

  console.log(movies)
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
            By{" "}
            Kevin Lemniai <FontAwesomeIcon icon={faStar} />
          </a>
        </div>
      </div>

      
      <form className="w-[30%] mt-10">
        <input onChange={handleChange} type="text" placeholder="Cherchez un film.." className="bg-gray-100 p-2 rounded-lg searchbar w-[100%]" />
      </form>

      <div className="bg-gray-300 text-gray-800 p-16 rounded-2xl w-[70%] flex flex-col items-center justify-center m-10 flex-wrap"> 
        <div>
          <p className="text-center mb-5 font-mono font-medium">Movies : {movies && movies.estimatedTotalHits} found in {movies && movies.processingTimeMs} ms</p>
          <div className="w-[100%] flex flex-row items-center justify-center gap-3 flex-wrap">
            {movies.hits &&  movies.hits.length > 0 && movies.hits.map((movie) => (
            <Card width={160} key={movie.externalId} externalId={movie.externalId} isAdult={movie.isAdult} originalLanguage={movie.originalLanguage} overviewEn={movie.overviewEn} overviewFr={movie.overviewFr} popularity={movie.popularity} posterPath={movie.posterPath} releaseDate={movie.releaseDate} titleEn={movie.titleEn} titleFr={movie.titleFr} voteAverage={movie.voteAverage} />
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
