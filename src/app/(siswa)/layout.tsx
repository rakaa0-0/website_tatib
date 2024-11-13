import Menu from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function FormLayout({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className=" flex">
        {/* LEFT */}
        <div className="w-[20%] md:w-[12%] lg:w-[17.5%] xl:w[14%] bg-white p-5">
          <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
          <Image
            src="/logo/logogrf.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="hidden lg:block text-[#434D97] font-semibold">IZIN SISWA</span>
          </Link>
          <Menu/>
        </div>
        {/* RIGHT */}
        <div className="w-[86%] md:w-[92%] lg-w[84%] xl:w[86%]">
          <Navbar/>
          {children}
        </div>
      </div>
    );
  }
  