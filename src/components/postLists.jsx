import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPost, fetchPosts, fetchTags } from '../api/api';

export const PostLists = () => {
	const queryCLient = useQueryClient();

	const {
		data: postData,
		isError,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	});

	const { data: tagsData } = useQuery({
		queryKey: ['tags'],
		queryFn: fetchTags,
	});

	const {
		mutate,
		isError: isPostError,
		isPending,
		error: postError,
		reset,
	} = useMutation({
		mutationFn: addPost,
		onMutate: () => {
			return { id: 1 };
		}, // runs before mutate function
		onSuccess: (data, variables, context) => {
			queryCLient.invalidateQueries({
				queryKey: ['posts'],
				exact: true,
				// predicate: () => {
				// 	query.queryKey[0] === 'posts' && query.quertKey[1].page >= 2;
				// },
			});
		}, // runs after mutate function
		// onError: (error, variables, context) => {},
		// onSettled: (data, error, variables, context) => {},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const title = formData.get('title');
		const tags = Array.from(formData.keys()).filter(
			(key) => formData.get(key) === 'on'
		);

		if (!title || !tags) return;

		mutate({ id: postData.length + 1, title, tags });

		e.target.reset();
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Enter your post..'
					className='postbox'
					name='title'
				/>
				<div className='tags'>
					{tagsData?.map((tag) => {
						return (
							<div key={tag}>
								<input name={tag} id={tag} type='checkbox' />
								<label htmlFor={tag}>{tag}</label>
							</div>
						);
					})}
				</div>
				<button>Post</button>
			</form>
			{isLoading && isPending && <p>Loadding ...</p>}
			{isError && <p>{error?.message}</p>}
			{isPostError && (
				<>
					<p>{postError?.message}</p>
					<button onClick={() => reset()}>Reset</button>
				</>
			)}

			{postData?.map((post) => {
				return (
					<div key={post?.id} className='post'>
						<div>{post?.title}</div>
						{post?.tags.map((tag) => (
							<span key={tag}>{tag}</span>
						))}
					</div>
				);
			})}
		</div>
	);
};
