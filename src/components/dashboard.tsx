'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getIzinHariIni, getTotalIzin } from '../services/izinServices'; 
const DashboardPage = () => {
  const [izinHariIni, setIzinHariIni] = useState(0);
  const [totalIzin, setTotalIzin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const hariIni = await getIzinHariIni();
      const total = await getTotalIzin();
      setIzinHariIni(hariIni);
      setTotalIzin(total);
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-2 flex-1">
      <div className="m-4 border-0.5 border-[#5F6CD5] rounded-lg">
        <div className="mt-4">
          <Link
            className="flex text-center align-items-center justify-center text-lg font-medium text-white mx-8 py-1.5 my-4 md:px-4 rounded-lg bg-[#5F6CD5]"
            href=""
          >
            Izin Hari Ini
          </Link>
          <p className="text-center text-3xl font-semibold text-[#434D97]">{izinHariIni} Siswa</p>
          <Link 
            href="/Tata-Tertib-SMK-Negeri-04-Malang/izin-hari-ini" 
            className="flex text-center align-items-center justify-center text-md underline text-[#5F6CD5] font-medium mx-8 py-1.5 my-4 md:px-4"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
      <div className="m-4 border-0.5 border-[#5F6CD5] rounded-lg">
        <div className="mt-4">
          <Link
            className="flex text-center align-items-center justify-center text-lg font-medium text-white mx-8 py-1.5 my-4 md:px-4 rounded-lg bg-[#5F6CD5]"
            href=""
          >
            Rekap Izin Siswa
          </Link>
          <p className="text-center text-3xl font-semibold text-[#434D97]">{totalIzin} Siswa</p>
          <Link 
            href="/Tata-Tertib-SMK-Negeri-04-Malang/rekap-izin" 
            className="flex text-center align-items-center justify-center text-md underline text-[#5F6CD5] font-medium mx-8 py-1.5 my-4 md:px-4"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;