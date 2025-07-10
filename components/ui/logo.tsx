import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center justify-start rounded-md">
      <Link href="/" className="flex items-center gap-2 font-medium">
        <Image src="/logo.svg" width={120} height={120} alt="OneClick Drive Logo" />
      </Link>
    </div>
  );
};

export default Logo;
