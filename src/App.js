import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer/index';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setcartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponce = await axios.get('https://64ca40f4700d50e3c704962b.mockapi.io/cart');
        const favoritesResponce = await axios.get('https://64d394e267b2662bf3dc75a6.mockapi.io/favorites');
        const itemsResponce = await axios.get('https://64ca40f4700d50e3c704962b.mockapi.io/items');

        setIsLoading(false);
        setCartItems(cartResponce.data);
        setFavorites(favoritesResponce.data);
        setItems(itemsResponce.data);
      } catch (error) {
        alert('Произошла ошибка при запросе данных с серверу!!! (функция fetchData)');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
        await axios.delete(`https://64ca40f4700d50e3c704962b.mockapi.io/cart/${obj.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post('https://64ca40f4700d50e3c704962b.mockapi.io/cart', obj);
      }
    } catch (error) {
      alert('Что-то пошло не так при добавлении товара в корзину, kurwa!!!');
      console.error(error);
    }
  }

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://64ca40f4700d50e3c704962b.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении товара из корзины!');
      console.error(error);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://64d394e267b2662bf3dc75a6.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://64d394e267b2662bf3dc75a6.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты, kurwa!!!');
      console.error(error);
    }
  }

  // Кнопка onAddToFavorite не работает!!! Скорее всего из-за того, что происходит ебала с mockapi.
  // Но если зайти на mockapi со второго аккаунта, то карточки нормально добавляются в favorites.
  // Хуй знает почему это работает именно так!!!

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setcartOpened, setCartItems }}>
      <div className="wrapper clear">

        <Drawer
          items={cartItems}
          onClose={() => setcartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

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
            element={<Favorites />}
            exact
          />
        </Routes>

        <Routes>
          <Route
            path="/orders"
            element={<Orders />}
            exact
          />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;