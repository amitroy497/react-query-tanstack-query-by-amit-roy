import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchPosts } from '../api/api';

export const PostLists = () => {
	const {
		data: postData,
		isError,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	});
	return (
		<div className='container'>
			{isLoading && <p>Loadding ...</p>}
			{isError && <p>{error?.message}</p>}

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
