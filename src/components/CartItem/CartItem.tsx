import { Link } from 'react-router-dom';
import styles from './CartItem.module.css';
import type { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import type { AppDispath } from '../../store/store';
import { carcActions } from '../../store/cart.slice';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispath>();
	
	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(carcActions.add(props.id));
	}

    const descrease = () => {
		dispatch(carcActions.remove(props.id));
    }

    const increase = () =>{
		dispatch(carcActions.delete(props.id));
    }


	return (
			<div className={styles['item']}>
				<div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}>
				</div>
					<div className={styles['description']}>
                        <div className={styles['name']}>{props.name}</div>
                        <div className={styles['price']}>
						{props.price}&nbsp;₽</div>
                    </div>
                    <div className={styles['actions']}>
                        <button className={styles['minus']} onClick={descrease}>
						    <img src='/minus.svg' alt='Удалить из корзины' />
					    </button>
                        <div className={styles['number']} >{props.count}</div>
                        <button className={styles['plus']} onClick={add}>
						    <img src='/plus.svg' alt='Кнопка добавления в корзину' />
					    </button>
                        <button className={styles['remove']} onClick={increase}>
						    <img src='/delete.svg' alt='Удалить все' />
					    </button>
                    </div>

			</div>
	);
}

export default CartItem;