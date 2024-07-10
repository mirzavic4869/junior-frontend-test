import React from "react";

export default function Loading() {
	return (
		<div className="flex items-center justify-center">
			<div className="w-8 h-8 border-t-2 border-b-2 border-l-2 border-r-2 rounded-full border-zinc-500 animate-spin border-t-zinc-800"></div>
		</div>
	);
}
