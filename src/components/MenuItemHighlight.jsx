
export default function MenuItemHighlight({ items }) {

	return (
		<div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8 shadow-md">
			<h3 className="font-serif text-xl text-center text-amber-800 mb-4">
				Polecane smaki
			</h3>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
				{items.map((item) => (
					<div
						key={item.name}
						className="p-4 rounded-lg transition-all bg-white"
					>
						<div className="flex justify-between mb-1">
							<h4 className="font-medium text-stone-800">{item.name}</h4>
							<span
								className="font-medium text-stone-600"
							>
								{item.price}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
