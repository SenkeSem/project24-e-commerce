import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {
  let favoriteArr = [];

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState(favoriteArr);

  const [searchValue, setSearchValue] = React.useState(""); 

  const [cartOpened, setcartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://64ca40f4700d50e3c704962b.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://64ca40f4700d50e3c704962b.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://64ca40f4700d50e3c704962b.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64ca40f4700d50e3c704962b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = (obj) => {
    axios.post('https://64d394e267b2662bf3dc75a6.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setcartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={() => setcartOpened(true)} />

      <Routes>
        <Route
          path="/favorites"
          element={"Это тестовое окно"}
          exact
        />
      </Routes>

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block d-flex align-center">
            <img height={14} width={14} src="img/search.svg" alt="Search" />
            {searchValue && 
            <img 
            onClick={() => setSearchValue("")} 
            className="clear cu-p" 
            src="/img/btn-remove.svg" 
            alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item,index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;