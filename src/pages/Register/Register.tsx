import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Hedling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import { useEffect, useState, type FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import type { LoginResponse } from '../../interfaces/auth.interface';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath,RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';



export type RegisterForm = {
    email:{
        value: string;
    };
    password:{
        value: string;
    };
	name:{
        value: string;
    };
};

export function Register() {
    
	const [error,setError] = useState<string | null>();
	const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();
    const {jwt, registerErrorMessage} = useSelector((s:RootState) => s.user);

    useEffect(() => {
        if(jwt){
            navigate('/');
        }
    },[jwt,navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const {email,password, name} = target;
		
        dispatch(register({email: email.value,password: password.value, name: name.value}));
	};

	
	return <div className={styles['login']}>
		<Hedling> Регистрация </Hedling>
		{registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor="email">Ваш email</label>
				<Input id="email" name="email" placeholder="Email"/>
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Ваш пароль</label>
				<Input id="password" name="password" type="password" placeholder="Пароль"/>
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Ваше имя</label>
				<Input id="name" name="name" placeholder="Имя"/>
			</div>
			<Button appearence="big">Зарегистрироваться</Button>
		</form>
		<div className={styles['links']}>
			<div>Есть аккаунт?</div>
			<div>
				<Link to="/auth/login">Войти</Link>
			</div>
		</div>
	</div>;
}