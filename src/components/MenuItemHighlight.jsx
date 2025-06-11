import { useState } from "react";

export default function MenuItemHighlight({ items }) {
	const [activeItem, setActiveItem] = useState(null);

	// Select a random item initially
	const randomIndex = Math.floor(Math.random() * items.length);

	return (
		<div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8 shadow-md">
			<h3 className="font-serif text-xl text-center text-amber-800 mb-4">
				Polecane smaki
			</h3>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
				{items.map((item, index) => (
					<div
						key={index}
						className={`p-4 rounded-lg cursor-pointer transition-all ${
							activeItem === index
								? "bg-amber-100 shadow-md"
								: "bg-white hover:bg-amber-50"
						}`}
						onClick={() => setActiveItem(index)}
					>
						<div className="flex justify-between mb-1">
							<h4 className="font-medium text-stone-800">{item.name}</h4>
							<span
								className={`font-medium ${activeItem === index ? "text-amber-700" : "text-stone-600"}`}
							>
								{item.price}
							</span>
						</div>
						{activeItem === index && (
							<div className="flex justify-end mt-2">
								<span className="inline-flex items-center text-sm text-amber-700">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									Polecane
								</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
