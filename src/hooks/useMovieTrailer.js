import { useEffect } from "react";
import { API_KEY, options } from "../Request";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../features/moviesSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()

    const getMovieVideos = async () => {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`,
          options
        );
        const json = await data.json();
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer))
      };
    
      useEffect(() => {
        getMovieVideos();
      }, [movieId]);
}
export default useMovieTrailer