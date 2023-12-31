import Card from '../components/Card';
import React from 'react';
import axios from 'axios';
import AppContext from '../context';

function Orders() {
  const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://64d394e267b2662bf3dc75a6.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Произошла ошибка при запросе заказов с сервера!!!')
      }
    })();

  }, []);

  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои заказы</h1>
        </div>

        <div className="d-flex flex-wrap">
        {(isLoading ? [Array(12)] : orders).map((item,index) => (
              <Card
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                loading={isLoading}
              />
            ))}
        </div>
      </div>
  );
}

export default Orders;