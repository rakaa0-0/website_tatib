import Link from "next/link";

const HariIniPage = () => {
  return (
    <div className="rounded-2xl bg-white p-4 flex-1">
      <div className="m-4 border-0.5 border-[#5F6CD5] rounded-md">
        <div className="mt-4">
          <Link
            className="flex text-center align-items-center justify-center text-lg font-medium text-white mx-8 mb-8 py-3 my-4  md:px-4 rounded-md bg-[#5F6CD5]"
            href=""
          >
            Izin Hari Ini
          </Link>
          <Link
            className="flex text-center align-items-center justify-center text-lg font-normal  text-[#5F6CD5] mx-8 py-1.5 my-4  md:px-4 rounded-md border-0.5 border-[#5F6CD5]"
            href="/Tata-Tertib-SMK-Negeri-04-Malang/izin-hari-ini/x"
          >
            Kelas X
          </Link>
          <Link
            className="flex text-center align-items-center justify-center text-lg font-normal text-[#5F6CD5] mx-8 py-1.5 my-4  md:px-4 rounded-md border-0.5 border-[#5F6CD5]"
            href=""
          >
            Kelas XI
          </Link>
          <Link
            className="flex text-center align-items-center justify-center text-lg font-normal text-[#5F6CD5] mx-8 py-1.5 my-4  md:px-4 rounded-md border-0.5 border-[#5F6CD5]"
            href=""
          >
            Kelas XII
          </Link>
          <Link
            className="flex text-center align-items-center justify-center text-lg font-normal text-[#5F6CD5] mx-8 py-1.5 my-4  md:px-4 rounded-md border-0.5 border-[#5F6CD5]"
            href=""
          >
            Kelas XIII
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HariIniPage;
