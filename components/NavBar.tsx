import Image from "next/image";
import DarkModeToggle from "./DarkModeToggler";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="h-20">
      <nav className="flex justify-between bordera p-8">
        <div className="flex items-center">
          <Image
            src="/hero2.jpeg"
            alt="logo"
            width={165}
            height={500}
            style={{ position: "relative", bottom: "20px", right: "30px" }}
          />
          <DarkModeToggle />
        </div>
        <ul className="flex space-x-8 text-teal-500">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/loo">Loo Page</Link>
          </li>
          <li>
            <Link href="/user">User Page</Link>
          </li>
          <li>
            <Link href="/auth">Login page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
