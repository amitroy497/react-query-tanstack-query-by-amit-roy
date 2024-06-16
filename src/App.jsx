import { useState } from 'react';
import './App.css';
import { PostLists } from './components/postLists';

function App() {
	const [toggle, setToggle] = useState(true);

	return (
		<div>
			<h2 className='title'>My Posts</h2>
			<button onClick={() => setToggle(!toggle)}>Toggle</button>
			{toggle && <PostLists />}
		</div>
	);
}

export default App;
