const Footer = () => {
  return (
    <footer
      className="flex flex-col
    text-black-100 mt-5 border-t 
    border-gray-300"
    >
      <div
        className="felx max-md:flex-col
        flex-warp justify-between gap-5 sm:px-16
        px-6 py-10"
      >
        <div
          className="flex flex-col 
            justify-start items-start gap-6"
        >
          <p
            className="text-base
                text-gray-400"
          >
            2 Asians & Brown Guy
            <br />
            Copyright {new Date().getFullYear()}. All rights reserved. &copy;
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
