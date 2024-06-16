import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { addPost, fetchPosts, fetchTags } from '../api/api';
import { useState } from 'react';

export const PostLists = () => {
	const queryCLient = useQueryClient();

	const [page, setPage] = useState(1);

	const {
		data: postData,
		isError,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['posts', { page }],
		queryFn: () => fetchPosts(page),
		// gcTime: 0,
		// refetchInterval: 1000 * 5,
		staleTime: 1000 * 60 * 5,
		// placeholderData: keepPreviousData,
	});

	const { data: tagsData } = useQuery({
		queryKey: ['tags'],
		queryFn: fetchTags,
		staleTime: Infinity,
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

		mutate({ id: postData?.data?.length + 1, title, tags });

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
			<div className='pages'>
				<button
					onClick={() =>
						setPage((oldPage) => {
							Math.max(oldPage - 1, 0);
						})
					}
					disabled={!postData?.prev}
				>
					Previous Page
				</button>
				<span>{page}</span>
				<button
					onClick={() => {
						if (postData?.next) {
							setPage((old) => old + 1);
						}
					}}
					// Disable the Next Page button until we know a next page is available
					disabled={postData?.next}
				>
					Next Page
				</button>
			</div>
			{postData?.data?.map((post) => {
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
