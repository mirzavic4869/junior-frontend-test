"use client";

import React, { useState } from "react";
import AddPostForm from "./AddPostForm";

const Post = () => {
	const [posts, setPosts] = useState([]);

	const addPost = (postData) => {
		// Update the posts state with the new post data
		setPosts([postData, ...posts]);
	};

	return (
		<div>
			<div className="flex justify-center mt-4">
				<h1 className="text-2xl font-bold">Add New Post</h1>
			</div>
			<AddPostForm onSubmit={addPost} />

			{/* <h2>Posts</h2>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<h3>{post.title}</h3>
						<p>{post.body}</p>
					</li>
				))}
			</ul> */}
		</div>
	);
};

export default Post;
