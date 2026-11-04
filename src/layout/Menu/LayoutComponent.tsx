import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './LayoutComponents.module.css';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';


export function Layout() {

	const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();;
	const profile = useSelector((s: RootState) => s.user.profile);
	const items = useSelector((s: RootState) => s.cart.items);

	useEffect(() => {
		dispatch(getProfile());
	},[dispatch]);

	const logout = () => {
        dispatch(userActions.logout());
		navigate('/auth/login');
	};
    
	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src='/Intersect.png' alt='Аватар'/>
				<div className={styles['name']}>
                                {profile?.name}
				</div>
				<div className={styles['email']}>
                                {profile?.email}
				</div>
			</div>
			<div className={styles['menu']}>
				<NavLink className={({isActive}) => cn(styles['link'],
					{[styles.active] :isActive}
				)} to='/'> 
					<img src='/menu-icon.svg' alt='Меню'/>
                            Menu 
				</NavLink>
				<NavLink className={({isActive}) => cn(styles['link'],
					{[styles.active] :isActive}
				)} to='/cart'>
					<img src='/cart-icon.svg' alt='Корзина'/>
                            Korzina <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span> 
				</NavLink>
				
			</div>
			<Button className={styles['exit']} onClick={logout}>
				<img src='/exits.svg' alt='Выход'/> Выход
			</Button>
		</div>
		<div className={styles['content']}>
			<Outlet />
		</div>
	</div>;
}