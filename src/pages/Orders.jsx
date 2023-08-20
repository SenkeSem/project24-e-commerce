import Card from '../components/Card';
import React from 'react';

function Orders() {

  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои заказы</h1>
        </div>

        <div className="d-flex flex-wrap">
        {/* {[].map((item,index) => (
              <Card
                key={index}
                id={item.id}
                favorited={true}
                onFavorite={onAddToFavorite}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))} */}
        </div>
      </div>
  );
}

export default Orders;