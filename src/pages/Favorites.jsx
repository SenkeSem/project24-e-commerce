import Card from '../components/Card';
import React from 'react';
import AppContext from '../context';

function Favorites({onAddToFavorite}) {
  const { favorites } = React.useContext(AppContext);



  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои закладки</h1>
        </div>

        <div className="d-flex flex-wrap">
        {favorites.map((item,index) => (
              <Card
                key={index}
                id={item.id}
                favorited={true}
                onFavorite={onAddToFavorite}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
        </div>
      </div>
  );
}

export default Favorites;