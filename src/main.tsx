import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart';
import { Error as ErrorPage } from './pages/ErrorPages/Error';
import { Layout } from './layout/Menu/LayoutComponent.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/success.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));


const router = createBrowserRouter([
	{
		path:'/',
		element: <RequireAuth> <Layout /> </RequireAuth>,
		children:[
			{
				path:'/',
				element:<Suspense fallback={<>Загрузка...</>}><Menu/></Suspense>
			},{
				path:'/success',
				element:<Success />
			},{
				path:'/cart',
				element:<Cart />
			},
			{
				path: '/product/:id',
				element: <Product/>,
				errorElement: <>Ошибка</>,
				loader: async({params}) => {
					return defer({
						data: new Promise((resolve,reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e=>reject(e));
							}, 2000);
						})
					});
					//     await new Promise<void>((resolve) => {
					//     setTimeout(() => {
					//         resolve();
					//     }, 2000);
					// });
					//     const {data} = await axios.get(`${PREFIX}/products/${params.id}`);
					//     return data;
				}
			}
		]
	},
	{
		path:'/auth',
		element: <AuthLayout />,
		children: [
			{
				path:'login',
				element: <Login/>
			},
			{
				path:'register',
				element: <Register/>
			}
		]

	},
	{
		path:'*',
		element:<ErrorPage />
	}
]);


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</StrictMode>
);
