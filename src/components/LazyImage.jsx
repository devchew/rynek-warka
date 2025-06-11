import { useState, useEffect, useRef } from "react";

// Helper function to generate srcset for responsive images
const generateSrcSet = (imageSrc) => {
	// Skip srcset generation for SVG images
	if (imageSrc.endsWith(".svg")) {
		return null;
	}

	// Extract base path and extension
	const lastDotIndex = imageSrc.lastIndexOf(".");
	if (lastDotIndex === -1) return null;

	const basePath = imageSrc.substring(0, lastDotIndex);
	const extension = imageSrc.substring(lastDotIndex);

	// Generate srcset for various widths
	const widths = [640, 768, 1024, 1280];
	return widths
		.map((width) => `${basePath}-${width}w${extension} ${width}w`)
		.join(", ");
};

const LazyImage = ({ src, alt, className, width, height }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const imgRef = useRef(null);

	// Generate srcset for responsive images
	const srcSet = generateSrcSet(src);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{
				rootMargin: "200px", // Load images 200px before they come into view
				threshold: 0.1,
			},
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => {
			if (imgRef.current) {
				observer.disconnect();
			}
		};
	}, []);

	// Handle image load event
	const handleImageLoaded = () => {
		setIsLoaded(true);
	};

	return (
		<div
			ref={imgRef}
			className={`relative overflow-hidden ${className || ""}`}
			style={{ width, height }}
		>
			{/* Placeholder/skeleton */}
			{!isLoaded && (
				<div className="absolute inset-0 bg-stone-200 animate-pulse" />
			)}
			{/* Actual image - only load when in view */}
			{isInView && (
				<img
					src={src}
					srcSet={srcSet}
					sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
					alt={alt}
					onLoad={handleImageLoaded}
					className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
					width={width}
					height={height}
					loading="lazy"
					decoding="async"
				/>
			)}
		</div>
	);
};

export default LazyImage;
