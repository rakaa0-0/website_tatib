"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Teacher = {
  nama_lengkap: string;
};

const DaftarGuruTatib = () => {
  const [guru, setGuru] = useState<Teacher[]>([]); 
  useEffect(() => {
    const fetchGuru = async () => {
      const { data, error } = await supabase
        .from('guru') 
        .select('nama_lengkap'); 

      if (error) {
        console.error('Error fetching teachers:', error);
      } else if (data) {
        setGuru(data); 
      }
    };

    fetchGuru();
  }, []);

  return (
    <div>
      <label htmlFor="izin" className="block text-gray-700 font-bold px-2">
        Guru Bidang Diklat
      </label>
      <select
        id="izin"
        name="izin"
        className="rounded-xl w-full py-3 pl-4 text-[#8F8F8F] bg-white leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" label="Pilih Salah Satu"></option>
        {guru.map((guru, index) => (
          <option key={index} value={guru.nama_lengkap}>
            {guru.nama_lengkap}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <label htmlFor="izin" className="block text-gray-700 font-bold px-2">
          Petugas Tatib/Piket
        </label>
        <select
          id="tatib"
          name="tatib"
          className="rounded-xl w-full py-3 pl-4 text-[#8F8F8F] bg-white leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" label="Pilih Salah Satu"></option>
          <option value="">Sulaimah, S.PdI</option>
          <option value="">Ach. Cholis M. M.PdI</option>
          <option value="">Salwa Erisa, S.Pd</option>
          <option value="">Yogi Dian Arinugroho, M.Pd.</option>
          <option value="">Fathur Rozi, S.Pd.</option>
          <option value="">M. Rizki Fadillah, S.Kom</option>
          <option value="">Nadzifa Kamilia Nada, S.Pd.</option>
          <option value="">M. Imron, S.Pd.</option>
          <option value="">Yoga Nugraha, S.Pd</option>
          <option value="">Haryo Guntoro Wicaksono, M.Pd.</option>
        </select>
      </div>
    </div>
  );
};

export default DaftarGuruTatib;
