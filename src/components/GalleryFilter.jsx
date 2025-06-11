import { useState } from "react";

export default function GalleryFilter({ categories, items }) {
	const [activeCategory, setActiveCategory] = useState("Wszystko");

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
	};

	const filteredItems =
		activeCategory === "Wszystko"
			? items
			: items.filter((item) => {
					// Match items to categories based on title or category field
					const itemCategory = item.category || item.title;
					return (
						itemCategory.includes(activeCategory) ||
						(item.description && item.description.includes(activeCategory))
					);
				});

	return (
		<>
			<div className="flex justify-center mb-12 overflow-x-auto py-2">
				<div className="flex gap-2 md:gap-4">
					{categories.map((category, index) => (
						<button
							key={index}
							onClick={() => handleCategoryClick(category)}
							className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
								category === activeCategory
									? "bg-amber-800 text-white"
									: "bg-stone-100 text-stone-700 hover:bg-stone-200"
							}`}
						>
							{category}
						</button>
					))}
				</div>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredItems.map((item, index) => (
					<div
						key={index}
						className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
					>
						<div className="relative aspect-square overflow-hidden">
							<img
								src={item.image}
								alt={item.title}
								className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							/>
						</div>
						<div className="p-4 bg-white">
							<h3 className="font-serif text-lg font-semibold text-stone-800 mb-2">
								{item.title}
							</h3>
							<p className="text-stone-600 text-sm">{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
