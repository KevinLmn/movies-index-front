import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";

type Props = {
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
    width : number;
}

const Card = ({externalId, width, isAdult, originalLanguage, overviewEn, overviewFr, popularity, posterPath, releaseDate, titleEn, titleFr, voteAverage } : Props) => {
    const date = new Date(releaseDate);
    const year = date.getFullYear();
    return (
        <Link href={`/${externalId}`} className="">
            <Image src={`https://image.tmdb.org/t/p/original${posterPath}`} className="rounded-lg" width={width} height={280} alt={`poster of ${titleEn}`} />
            <div className="flex justify-between">
                <p>{year}</p>
                <Stars count={voteAverage}/>
            </div>
        </Link >
    );
}

export default Card;