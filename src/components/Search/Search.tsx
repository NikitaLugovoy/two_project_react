import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import type { InputProps } from './Search.props';

const Search = forwardRef<HTMLInputElement,SearchProps>(function Input({className,isValid=true, ...props}, ref) {

	return (

		<div className={styles['input-wrapper']}>
			<input {...props} ref={ref} className={cn(styles['input'],className,{
				[styles['invalid']] : !isValid
			})} {...props}/>
			<img className={styles['icon']} src='/search.svg' alt='Поиск'/>
		</div>
		
	);
});

export default Search;
