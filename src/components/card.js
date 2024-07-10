import React from "react";

export default function Card({ id, title, body }) {
	return (
		<div key={id} className="max-w-sm transition-all duration-300 ease-in-out bg-white shadow-lg rounded-xl hover:shadow-xl">
			<div className="p-6 w-full h-96">
				<h3 className="text-xl font-bold text-zinc-800">{title}</h3>
				<p className="my-4 text-sm text-zinc-500">{body}</p>
			</div>
		</div>
	);
}
