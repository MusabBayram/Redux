import { useEffect } from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { fetchCharacters } from '../../redux/charactersSlice';
import Masonry from 'react-masonry-css'
import './style.css';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function Home() {
  const characters = useSelector((state) => state.characters.items);
  const isLoading = useSelector((state) => state.characters.isLoading);
  const error = useSelector((state) => state.characters.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  if(isLoading) {
    return <Loading />
  }
  if(error) {
    return <Error message={message} /> 
  }
  dispatch(fetchCharacters());
  return (
    <div>
      
      <h1>Characters</h1>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {
          characters.map(character => (
            <div key={character.char_id}>
              <img alt={character.name} src={character.img} className="character"/>
              <div className='char_name'>{character.name}</div>
            </div>
          ))
        }
      </Masonry>
      
    </div>
  )
}

export default Home