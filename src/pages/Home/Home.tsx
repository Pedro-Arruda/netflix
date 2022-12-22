import styles from "./Home.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MovieRow } from "../components/MovieRow/MovieRow";
import { Info } from "phosphor-react";

export const Home = () => {
  return (
    <div className={styles["home"]}>
      <div className={styles["img-banner"]}>
        <div className={styles["banner-text"]}>
          <h1>
            BREAKING <br /> BAD
          </h1>
          <p>
            Um professor do secundário com cancro do pulmão terminal junta-se a
            um ex-aluno para fabricar e vender metanfetaminas como forma de
            garantir o futuro da sua família
          </p>
          <button>
            <Info size={32} /> Ver detalhes
          </button>
        </div>
      </div>
      <div className={styles["movie-list"]}>
        <MovieRow movieQuery="top_rated" title="Principais Filmes" />
        <MovieRow movieQuery="popular" title="Filmes mais populares" />{" "}
        <MovieRow movieQuery="upcoming" title="Vem aí" />{" "}
      </div>
    </div>
  );
};
