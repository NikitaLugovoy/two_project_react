import { useState, type MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';


function App() {

	const [counter,setCounter] = useState<number>(0);

	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button appearence='small' onClick={addCounter} > Кнопка </Button>
			<Button appearence='big' onClick={addCounter} > Кнопка </Button>
			<Input placeholder='Email'/>
		</>
	);
}

export default App;
