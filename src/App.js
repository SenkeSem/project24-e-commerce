import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: "/img/sneakers/1.jpg"},
  {title: 'Мужские Кроссовки Nike Air Max 270', price: 15600, imageUrl: "/img/sneakers/2.jpg"},
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8500, imageUrl: "/img/sneakers/3.jpg"},
  {title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, imageUrl: "/img/sneakers/4.jpg"},
];

function App() {
  const [cartOpened, setcartOpened] = React.useState(false);
  
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setcartOpened(false)}/>}
      <Header onClickCart={() => setcartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex align-center">
            <img height={14} width={14} src="img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFavorite={() => console.log("Добавили в закладки")}
              onPlus={() => console.log("нажали плюс")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;