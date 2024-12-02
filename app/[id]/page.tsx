"use client";

import Card from "@/components/Card";
import { Description } from "@/components/description";
import axios from "axios";
import { useParams } from "next/navigation";
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
  const [movie, setMovie] = useState<Movie[]>();
  const [recommandations, setRecommandations] = useState<Movie[]>();
  const { id } = useParams();

  const fetchMovie = async () => {
    const response = await axios.get(
      `https://api.decouvertecinema.fr/search/movie/${id}`
    );
    setMovie(response.data.movie);
    setRecommandations(response.data.recommandations);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Indexation de 10000 films avec
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

      {movie && (
        <Description
          genres={movie.genresEN}
          originalLanguage={movie.originalLanguage}
          overview={movie.overviewEn}
          popularity={movie.popularity}
          posterPath={movie.posterPath}
          releaseDate={movie.releaseDate}
          title={movie.titleEn}
          voteAverage={movie.voteAverage}
        />
      )}

      <div className="text-gray-800 p-8 rounded-2xl w-[90%] gap-4 flex flex-col items-center justify-center flex-wrap">
        <p className="flex justify-self- text-center text-lg font-bold">
          Films similaires
        </p>
        {/* <p className="text-center mb-5 font-mono font-medium">Movies : {movies && movies.estimatedTotalHits} found in {movies && movies.processingTimeMs} ms</p> */}
        <div className="w-[100%] flex flex-row items-center justify-center gap-5 flex-wrap mb-20">
          {recommandations &&
            recommandations.length > 0 &&
            recommandations.map((movie) => (
              <Card
                width={140}
                minHeight={100}
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
