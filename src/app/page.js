"use client";

import { Card } from "@/components";
import { baseUrl } from "@/lib";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
	const [listItem, setListItem] = useState([]);

	async function getList() {
		try {
			const result = await axios.get(`${baseUrl}/posts`);
			setListItem(result.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getList();
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-18 lg:p-24">
			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
				{listItem.map(({ id, title, body }) => (
					<div key={id}>
						<Card title={title} body={body} />
					</div>
				))}
			</div>
		</main>
	);
}
