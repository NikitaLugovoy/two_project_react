import { useEffect, useState, type ChangeEvent } from 'react';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';


export function Menu() {

	const [products,setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();


	useEffect(() =>{
		getMenu(filter);
	}, [filter]);

	const getMenu = async(name?: string) => {
		try{
			setIsLoading(true);
        

			const { data } = await axios.get<Product[]>(`${PREFIX}/products`,{
				params: {
					name
				}
			});
			setProducts(data);
			setIsLoading(false);
		} catch(e){
			console.error(e);
			if(e instanceof AxiosError){
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}      
	};

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && products.length > 0 && <MenuList products={products} />}
			{isLoading && <>ЗАГРУЖАЕМ ПРОДУКТЫ</>}
			{!isLoading && products.length === 0 && <> Не найдено блюд по запросу</>}
		</div>
	</>;
}


export default Menu;