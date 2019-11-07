export class Movie {
    _id: string;
    title: string;
    poster: string;
    plot: string;
    fullplot: string;
    cast: string[];
    genres: string[];
    year: number;
    imdb: {
        rating,
        votes,
        id
    };
}
