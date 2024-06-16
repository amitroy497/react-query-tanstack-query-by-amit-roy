import './App.css';
import { PostLists } from './components/postLists';

function App() {
	return (
		<div>
			<h2 className='title'>My Posts</h2>
			<PostLists />
		</div>
	);
}

export default App;
