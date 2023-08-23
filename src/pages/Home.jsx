import React from 'react';
import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {


  const renderItems = () => {
    const filtredItems = items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isLoading ? [Array(12)] : filtredItems).map((item,index) => (
      <Card
        key={index}
        title={item.title}
        price={item.price}
        imageUrl={item.imageUrl}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };


  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block d-flex align-center">
            <img height={14} width={14} src="img/search.svg" alt="Search" />
            {searchValue && 
            <img 
            onClick={() => setSearchValue("")} 
            className="clear cu-p" 
            src="img/btn-remove.svg" 
            alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
  );
}

export default Home;