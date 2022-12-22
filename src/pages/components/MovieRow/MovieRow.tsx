import { Carousel } from "react-responsive-carousel";
import styles from "./MovieRow.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface Movies {
  results: {
    backdrop_path: string;
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
  }[];
}

interface MovieQueryProps {
  movieQuery: string;
  title: string;
}

export const MovieRow = ({ movieQuery, title }: MovieQueryProps) => {
  const imgURL = import.meta.env.VITE_IMG;
  const moviesURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const navigate = useNavigate();

  const [MoviesPageOne, setMoviesPageOne] = useState<Movies>();
  const [MoviesPageTwo, setMoviesPageTwo] = useState<Movies>();
  const [MoviesPageThree, setMoviesPageThree] = useState<Movies>();

  const fetchMovies = async () => {
    try {
      const responsePageOne = await fetch(
        `${moviesURL}${movieQuery}?page=1&${apiKey}`
      );
      const dataPageOne: Movies = await responsePageOne.json();
      setMoviesPageOne(dataPageOne);

      const responsePageTwo = await fetch(
        `${moviesURL}${movieQuery}?page=2&${apiKey}`
      );

      const dataPageTwo: Movies = await responsePageTwo.json();
      setMoviesPageTwo(dataPageTwo);

      const responsePageThree = await fetch(
        `${moviesURL}${movieQuery}?page=3&${apiKey}`
      );

      const dataPageThree: Movies = await responsePageThree.json();
      setMoviesPageThree(dataPageThree);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={styles["movies"]}>
      <h1>{title}</h1>
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        emulateTouch
      >
        {MoviesPageOne ? (
          <div className={styles["movies-row"]}>
            {MoviesPageOne.results.map((movie) => (
              <Link to={`/details/${movie.id}`}>
                <img src={imgURL + movie.poster_path} />
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}

        {MoviesPageTwo ? (
          <div className={styles["movies-row"]}>
            {MoviesPageTwo.results.map((movie) => (
              <Link to={`/details/${movie.id}`}>
                <img
                  src={imgURL + movie.poster_path}
                  onClick={() => navigate(`/details/${movie.id}`)}
                />
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}

        {MoviesPageThree ? (
          <div className={styles["movies-row"]}>
            {MoviesPageThree.results.map((movie) => (
              <Link to={`/details/${movie.id}`}>
                <img
                  src={imgURL + movie.poster_path}
                  onClick={() => navigate(`/details/${movie.id}`)}
                />
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </Carousel>
    </div>
  );
};
