import styles from './Card.module.scss'
import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';



function Card({id, title, price, imageUrl, onFavorite, onPlus, favorited = false, added = false, loading = false}) {

  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);


  const onClickPlus = () => {
    onPlus({ id, title, price, imageUrl });
  }

  const onClickFavorite = () => {
    onFavorite({id, title, price, imageUrl});
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.card}>

      {
        loading ? <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="99" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="127" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="151" rx="8" ry="8" width="80" height="24" />
          <rect x="111" y="143" rx="8" ry="8" width="32" height="32" />
        </ContentLoader> : <>
          <div className={styles.favorite} onClick={onFavorite}>
            <img onClick={onClickFavorite} src={isFavorite ? "img/liked.svg" : "img/unliked.svg"} alt="Unliked" />
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
          </div>
        </>
      }
    </div>
  );
}

export default Card;