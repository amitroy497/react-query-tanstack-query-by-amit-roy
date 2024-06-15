import { useQuery } from '@tanstack/react-query';
import './App.css';
import { fetchPosts } from './api/api';

function App() {
	const { data, isLoading, isError, error, status } = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	});

	console.log(data, isLoading, status);

	return <>Hello World!</>;
}

export default App;
