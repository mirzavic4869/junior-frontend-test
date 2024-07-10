"use client";

import { Card, Loading } from "@/components";
import { baseUrl } from "@/lib";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 8;

export default function Home() {
	const [listItem, setListItem] = useState([]);
	const [searchList, setSearchList] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	async function getList() {
		try {
			const result = await axios.get(`${baseUrl}/posts`);
			setListItem(result.data);
		} catch (error) {
			console.log(error);
			alert("Something went wrong. Please try again later.");
			setError("Failed to fetch data. Please try again later.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getList();
	});

	// Search
	const filteredList = listItem.filter(({ title }) => title.toLowerCase().includes(searchList.toLowerCase()));

	// Pagination
	const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
	const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
	const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

	const handleSearch = (e) => {
		setSearchList(e.target.value);
		setCurrentPage(1);
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Loading
	if (loading) {
		return (
			<main className="flex items-center justify-center min-h-screen">
				<Loading />
			</main>
		);
	}

	// Error
	if (error) {
		return (
			<main className="flex items-center justify-center min-h-screen">
				<p className="text-rose-600">{error}</p>
			</main>
		);
	}

	return (
		<main className="flex flex-col min-h-screen px-4 py-12 md:p-18 lg:p-24">
			<div className="flex justify-between gap-8">
				{/* Search */}
				<input
					value={searchList}
					onChange={handleSearch}
					placeholder="Search by title..."
					className="w-1/2 mb-8 appearance-none rounded-md border border-solid border-[#e2e2e2] px-4 py-3 outline-none text-sm font-light placeholder-gray-400 focus:border-zinc-700 focus:ring-zinc-700"
				/>
				<Link href="/post">
					<button className="col-span-1 rounded-md bg-zinc-700 px-4 py-2.5 text-sm font-medium uppercase text-white hover:bg-zinc-900 hover:shadow-md focus:ring-1 focus:ring-zinc-500" type="submit">
						add posts
					</button>
				</Link>
			</div>
			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
				{currentItems.map(({ id, title, body }) => (
					<div key={id}>
						<Card title={title} body={body} />
					</div>
				))}
			</div>

			{/* Pagination controls */}
			<div className="grid grid-cols-4 gap-4 my-4 md:grid-cols-8 lg:grid-cols-12">
				{Array.from({ length: totalPages }, (_, index) => (
					<button key={index} onClick={() => paginate(index + 1)} className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-zinc-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
						{index + 1}
					</button>
				))}
			</div>
		</main>
	);
}
