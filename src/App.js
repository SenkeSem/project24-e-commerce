import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  const [cartOpened, setcartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://64ca40f4700d50e3c704962b.mockapi.io/items')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setItems(json);
    });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  }

  
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setcartOpened(false)}/>}
      <Header onClickCart={() => setcartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex align-center">
            <img height={14} width={14} src="img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log("Добавили в закладки")}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;