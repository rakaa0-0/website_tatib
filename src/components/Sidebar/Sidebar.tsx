import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "Informasi :",
    items: [
      {
        icon: "/icon/dashboard.svg",
        label: "Dashboard",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="bg-[#EFF0FB] border-[#949DE3]-1 text-center  hidden lg:block my-4 p-3 rounded-lg">
            <p className="font-semibold text-xl text-black">{i.title}</p>
            <p className="text-gray-400 text-xs my-5">Anda mempunyai batas izin 1 kali setiap minggunya</p>
            <Link className="flex text-center justify-center lg:justify-start text-xs  text-white py-2 md:px-4 rounded-lg bg-[#5F6CD5] hover:bg-gray-950" href="/">Cek Selengkapnya</Link>
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-white py-4 md:px-4 rounded-xl bg-[#434D97] hover:bg-gray-950"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
