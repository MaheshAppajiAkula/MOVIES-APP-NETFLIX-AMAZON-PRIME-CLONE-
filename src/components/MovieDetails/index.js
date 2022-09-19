import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import FailureView from '../FailureView'
import LoadingView from '../Loader'
import MovieSpecifications from '../MovieSpecifications'
import MovieDetailsLink from '../MovieDetailsLink'
import FooterSection from '../FooterSection'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetailsList: [],
    genresList: [],
    similarMoviesList: [],
    spokenLanguagesList: [],
  }

  componentDidMount() {
    this.getMovieDetailsList()
  }

  getMovieDetailsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const movieItemDetailsApi = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(movieItemDetailsApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.movie_details.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        budget: eachMovie.budget,
        title: eachMovie.title,
        overview: eachMovie.overview,
        originalLanguage: eachMovie.original_language,
        releaseDate: eachMovie.release_date,
        count: eachMovie.vote_count,
        rating: eachMovie.vote_average,
        runtime: eachMovie.runtime,
        posterPath: eachMovie.poster_path,
      }))

      const genresData = fetchedData.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))

      const similarMoviesData = fetchedData.movie_details.similar_movies.map(
        eachSimilar => ({
          id: eachSimilar.id,
          posterPath: eachSimilar.poster_path,
          title: eachSimilar.title,
        }),
      )

      const spokenLanguagesData = fetchedData.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          language: eachLanguage.name,
        }),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetailsList: updatedData,
        genresList: genresData,
        similarMoviesList: similarMoviesData,
        spokenLanguagesList: spokenLanguagesData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getMovieDetailsList()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoadingView = () => <LoadingView />

  renderSuccessView = () => {
    const {
      movieDetailsList,
      similarMoviesList,
      genresList,
      spokenLanguagesList,
    } = this.state

    return (
      <>
        <div>
          {movieDetailsList.map(eachMovie => (
            <MovieSpecifications movieInfo={eachMovie} key={eachMovie.id} />
          ))}
          <div className="movie-information">
            <div className="movie-details-container">
              <div className="each-info"></div>
              <div className="each-info"></div>
              <div className="each-info"></div>
              <div className="each-info"></div>
            </div>
          </div>
          <div className="similar-movies-container">
            <h1 className="side-heading">More like this</h1>
            <div className="similar-movies-list">
              {similarMoviesList.map(eachMovie => (
                <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
              ))}
            </div>
          </div>
          <FooterSection />
        </div>
      </>
    )
  }
}

export default MovieDetails
