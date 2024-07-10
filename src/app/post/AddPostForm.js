import { baseUrl } from "@/lib";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const AddPostForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const submitForm = async (data) => {
		try {
			const response = await fetch(`${baseUrl}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: data.title,
					body: data.body,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add post");
			}

			const postData = await response.json();
			onSubmit(postData);
			console.log(response);
			router.push("/");
		} catch (error) {
			console.error("Error adding post:", error);
		}
	};

	return (
		<div className="flex justify-center w-full px-4 py-12 md:p-18 lg:p-24">
			<form className="w-full px-12 py-8 space-y-4 bg-white rounded-md shadow-xl md:w-1/2" onSubmit={handleSubmit(submitForm)}>
				<div className="space-y-2">
					<label>Title:</label>
					<input
						className="w-full appearance-none rounded-md border border-solid mb-1 border-[#e2e2e2] px-4 py-3 outline-none text-sm font-light placeholder-gray-400 focus:border-zinc-700 focus:ring-zinc-700"
						{...register("title", { required: true })}
					/>
					{errors.title && <span className="text-sm italic text-rose-600">Title is required</span>}
				</div>

				<div className="space-y-2">
					<label>Body:</label>
					<textarea
						className="w-full appearance-none rounded-md border border-solid mb-1 border-[#e2e2e2] px-4 py-3 outline-none text-sm font-light placeholder-gray-400 focus:border-zinc-700 focus:ring-zinc-700"
						{...register("body", { required: true })}
					/>
					{errors.body && <span className="text-sm italic text-rose-600">Body is required</span>}
				</div>

				<button className="col-span-1 rounded-md bg-zinc-700 px-4 py-2.5 text-sm font-medium uppercase text-white hover:bg-zinc-900 hover:shadow-md focus:ring-1 focus:ring-zinc-500" type="submit">
					Add Posts
				</button>
			</form>
		</div>
	);
};

export default AddPostForm;
