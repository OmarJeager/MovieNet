import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const MoviePlayer = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Watch Movie</h2>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls />
    </div>
  );
};

export default MoviePlayer;
