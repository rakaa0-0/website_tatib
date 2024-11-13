import Link from "next/link";

const HariIniXPage = () => {
  const classes = [
    "Teknik Logistik",
    "Mekatronika",
    "Teknik Grafika",
    "Perhotelan",
    "Teknik Komputer dan Jaringan",
    "Animasi",
    "Rekayasa Perangkat Lunak",
    "Desain Komunikasi Visual",
  ];

  return (
    <div className="rounded-2xl bg-white p-4 flex-1">
      {/* izin hari ini */}
      <div className="m-4 border-0.5 border-[#5F6CD5] rounded-md">
        <div className="mt-4">
          <Link
            className="flex text-center align-items-center justify-center text-lg font-medium text-white mx-8 py-3 md:px-4 rounded-md bg-[#5F6CD5]"
            href=""
          >
            Izin Hari Ini
          </Link>
          <Link
            className="flex text-center align-items-center justify-center text-lg font-medium text-white mx-8 mb-8 py-3 md:px-4 rounded-md bg-[#949DE3]"
            href=""
          >
            Kelas X
          </Link>
        </div>

        {/*  */}

        <div className="flex flex-col md:flex-row">
          <div className="mt-4 w-full md:w-2/3">
            <Link
              className="flex text-center align-items-center justify-center text-lg font-normal  text-[#5F6CD5] mx-8 py-1.5 my-4  md:px-4 rounded-md border-0.5 border-[#5F6CD5]"
              href=""
            >
              Teknik Logistik
            </Link>
          </div>
          <div className="mt-4 w-full md:w-2/3">
            <Link
              className="flex text-center align-items-center justify-center text-lg font-normal  text-[#5F6CD5] mx-8 py-1.5 my-4  md:px-4 rounded-md border-0.5 border-[#5F6CD5]"
              href=""
            >
              Mekatronika
            </Link>
          </div>
          <div className="mt-4 w-full md:w-2/3">
            <Link
              className="flex text-center align-items-center justify-center text-lg font-normal  text-[#5F6CD5] mx-8 py-1.5 my-4  md:px-4 rounded-md border-0.5 border-[#5F6CD5]"
              href=""
            >
              Teknik Grafika
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HariIniXPage;
