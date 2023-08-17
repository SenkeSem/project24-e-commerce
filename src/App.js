import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home'; 
import Favorites from './pages/Favorites'; 
import AppContext from './context';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(""); 
  const [cartOpened, setcartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponce = await axios.get('https://64ca40f4700d50e3c704962b.mockapi.io/cart');
      const favoritesResponce = await axios.get('https://64d394e267b2662bf3dc75a6.mockapi.io/favorites');
      const itemsResponce = await axios.get('https://64ca40f4700d50e3c704962b.mockapi.io/items');
      setIsLoading(false);

      setCartItems(cartResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://64ca40f4700d50e3c704962b.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://64ca40f4700d50e3c704962b.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert('Что-то пошло не так, kurwa!!!');
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64ca40f4700d50e3c704962b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://64d394e267b2662bf3dc75a6.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://64d394e267b2662bf3dc75a6.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты, kurwa!!!');
    }
  }

  // Кнопка onAddToFavorite не работает!!! Скорее всего из-за того, что происходит ебала с mockapi.
  // Но если зайти на mockapi со второго аккаунта, то карточки нормально добавляются в favorites.
  // Хуй знает почему это работает именно так!!!

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded}}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setcartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setcartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={<Home
              cartItems={cartItems}
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}
            exact
          />
        </Routes>

        <Routes>
          <Route
            path="/favorites"
            element={<Favorites
              onAddToFavorite={onAddToFavorite}
            />}
            exact
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;