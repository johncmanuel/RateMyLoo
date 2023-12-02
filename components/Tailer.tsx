import Image from "next/image";

const Tailer = () => {
  return (
    <footer className="">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <Image src="/hero2.jpeg" alt="logo" width={118} height={18} className="object-contain" />
        <div style={{ borderTop: "1px solid #000", width: "100%" }}></div>
        <p></p>
      </div>
    </footer>
  );
};

export default Tailer;
