import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";

type Props = {
  externalId: string;
  minHeight: number;
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
  width: number;
};

const Card = ({
  externalId,
  width,
  posterPath,
  releaseDate,
  titleEn,
  voteAverage,
  minHeight,
}: Props) => {
  const date = new Date(releaseDate * 1000);
  const year = date.getFullYear();
  console.log(width);
  return (
    <Link href={`/${externalId}`} className="flex flex-col justify-between">
      {posterPath ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${posterPath}`}
          className={`rounded-lg min-h-${minHeight}`}
          width={width}
          height={280}
          alt={`poster of ${titleEn}`}
        />
      ) : (
        <p>No image provided</p>
      )}
      <div className="flex justify-between">
        <p>{year}</p>
        <Stars count={voteAverage} />
      </div>
    </Link>
  );
};

export default Card;
