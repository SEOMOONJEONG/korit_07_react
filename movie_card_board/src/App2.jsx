import { useState, useEffect } from "react"
import Movie from "./components/Movie";

function App() {
  const [ loading, setLoading ] = useState(true);
  const [ movies, setMovies ] = useState([]);

  const getMovies = async () => {
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`);
    const json = await response.json();
    setMovies(json.data.movies);
    console.log(json.data.movies);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, []);
  
// 이제 return 파트에서 Loading이 끝나면 Movie를 뿌릴겁니다.
  return (
    <div>
      {
        loading ? <h1>로딩 중... 🚓</h1> : <div>{movies.map(movie =>
          <Movie
            key={movie.id}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres}
          />
        )}</div>
      }
    </div>
  )
}

export default App
