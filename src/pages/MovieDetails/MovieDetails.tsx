import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.scss";
import { useEffect, useState } from "react";
import { Movies } from "../components/MovieRow/MovieRow";
import ClipLoader from "react-spinners/ClipLoader";

interface MovieDetailsQuery {
  backdrop_path?: string;
  genres: { id: number; name: string }[];
  id: number;
  overview: string;
  poster_path: string;
  production_countries?: { iso_3166_1: string; name: string }[];
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  production_companies: {
    name: string;
  }[];
}

export const MovieDetails = () => {
  const imgURL = import.meta.env.VITE_IMG;
  const moviesURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [movieDetails, setMovieDetails] = useState<MovieDetailsQuery>();
  const [movieSimilar, setMovieSimilar] = useState<Movies>();

  const params = useParams();

  const getMovieDetails = async () => {
    try {
      const response = await fetch(`${moviesURL}${params.id}?${apiKey}`);
      const data: MovieDetailsQuery = await response.json();

      setMovieDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieSimilars = async () => {
    try {
      const response = await fetch(
        `${moviesURL}${params.id}/similar?${apiKey}`
      );
      const data: Movies = await response.json();

      setMovieSimilar(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getMovieSimilars();
  }, []);

  console.log(movieDetails);

  return (
    <div className={styles["movie-container"]}>
      <img
        src={imgURL + movieDetails?.poster_path}
        height={700}
        width={600}
        className={styles["movie-img"]}
      />
      <div className={styles["movie-details"]}>
        <div className={styles["movie-infos"]}>
          <div className={styles["flex"]}>
            <h2>{movieDetails?.title}</h2>
            <p>{movieDetails?.vote_average.toFixed(2)}</p>
          </div>
          <p>{movieDetails?.release_date}</p>
          <p className={styles["genres"]}>
            {movieDetails?.genres.map((genre) => (
              <p>{genre.name}</p>
            ))}
          </p>
          <p>{movieDetails?.overview}</p>
          <p> Duration: {movieDetails?.runtime} min</p>
          {movieDetails?.production_countries && (
            <p>
              Production countrie: {movieDetails?.production_countries[0].name}
            </p>
          )}

          <p>
            Production company: {movieDetails?.production_companies[0].name}
          </p>
        </div>

        <div className={styles["similar-movies-container"]}>
          <h2>Similar Movies</h2>
          <div className={styles["similar-movies"]}>
            {movieSimilar?.results.slice(0, 5).map((movie) => (
              <img src={imgURL + movie.poster_path} height={200} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
