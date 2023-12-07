import Image from "next/image";

const Tailer = () => {
	return (
		<div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
			<Image
				src="/hero2.jpeg"
				alt="logo"
				width={150}
				height={18}
				className="object-contain"
				style={{ position: "relative", right: "50px", top: "20px" }}
			/>

			<p></p>
		</div>
	);
};

export default Tailer;
