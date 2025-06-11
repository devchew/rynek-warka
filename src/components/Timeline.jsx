import { useState } from "react";

export default function Timeline() {
	const [activeEvent, setActiveEvent] = useState(null);

	const timelineEvents = [
		{
			year: "2018",
			title: "Otwarcie kawiarni",
			description: "Założenie kawiarni i galerii rękodzieła w centrum Warki.",
		},
		{
			year: "2019",
			title: "Rozszerzenie oferty",
			description:
				"Wprowadzenie produktów regionalnych i nawiązanie współpracy z lokalnymi artystami.",
		},
		{
			year: "2020",
			title: "Nowe wyzwania",
			description:
				"Dostosowanie działalności do nowych warunków i rozwinięcie usług na wynos.",
		},
		{
			year: "2022",
			title: "Odnowienie wnętrza",
			description:
				"Odświeżenie przestrzeni kawiarni i poszerzenie galerii o nowych twórców.",
		},
		{
			year: "2023",
			title: "Rozwój oferty",
			description:
				"Wprowadzenie nowych specjałów do menu i nawiązanie współpracy z lokalnymi dostawcami.",
		},
	];

	return (
		<div className="py-12">
			<h2 className="font-serif text-3xl font-bold text-stone-800 mb-8 text-center">
				Nasza historia
			</h2>
			<div className="relative">
				{/* Timeline line */}
				<div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-amber-200"></div>

				{/* Events */}
				{timelineEvents.map((event, index) => (
					<div
						key={index}
						className="relative mb-12"
						onMouseEnter={() => setActiveEvent(index)}
						onMouseLeave={() => setActiveEvent(null)}
					>
						<div
							className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
						>
							{/* Year marker */}
							<div className="md:w-1/2 flex justify-center md:justify-start mb-4 md:mb-0">
								<div
									className={`flex items-center ${index % 2 === 0 ? "md:pl-8" : "md:pr-8 md:justify-end"}`}
								>
									<div
										className={`flex items-center justify-center h-12 w-12 rounded-full shadow-md transition-all duration-300 z-10 ${
											activeEvent === index
												? "bg-amber-800 text-white scale-110"
												: "bg-white text-amber-800"
										}`}
									>
										<span className="font-bold">{event.year}</span>
									</div>
								</div>
							</div>

							{/* Content */}
							<div
								className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}
							>
								<div
									className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
										activeEvent === index ? "shadow-lg -translate-y-1" : ""
									}`}
								>
									<h3 className="font-serif text-xl font-bold text-amber-800 mb-2">
										{event.title}
									</h3>
									<p className="text-stone-600">{event.description}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
