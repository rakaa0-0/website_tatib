"use client";

import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Define the type of each teacher object
type Teacher = {
  nama_lengkap: string;
};

type DaftarGuruTatibProps = {
  onGuruChange: (value: string) => void;
  onTatibChange: (value: string) => void;
};

const DaftarGuruTatib = ({ onGuruChange, onTatibChange }: DaftarGuruTatibProps) => {
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
      <label htmlFor="guru" className="block text-gray-700 font-bold px-2">
        Guru Bidang Diklat
      </label>
      <select
        id="guru"
        name="guru"
        className="rounded-xl w-full py-3 pl-4 text-[#8F8F8F] bg-white leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => onGuruChange(e.target.value)} // Add onChange handler
      >
        <option value="" label="Pilih Salah Satu" disabled></option>
        {guru.map((guru, index) => (
          <option key={index} value={guru.nama_lengkap}>
            {guru.nama_lengkap}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <label htmlFor="tatib" className="block text-gray-700 font-bold px-2">
          Petugas Tatib/Piket
        </label>
        <select
          id="tatib"
          name="tatib"
          className="rounded-xl w-full py-3 pl-4 text-[#8F8F8F] bg-white leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => onTatibChange(e.target.value)} // Add onChange handler
        >
          <option value="" label="Pilih Salah Satu" disabled></option>
          <option value="Sulaimah, S.PdI">Sulaimah, S.PdI</option>
          <option value="Ach. Cholis M. M.PdI">Ach. Cholis M. M.PdI</option>
          <option value="Salwa Erisa, S.Pd">Salwa Erisa, S.Pd</option>
          <option value="Yogi Dian Arinugroho, M.Pd.">Yogi Dian Arinugroho, M.Pd.</option>
          <option value="Fathur Rozi, S.Pd.">Fathur Rozi, S.Pd.</option>
          <option value="M. Rizki Fadillah, S.Kom">M. Rizki Fadillah, S.Kom</option>
          <option value="Nadzifa Kamilia Nada, S.Pd.">Nadzifa Kamilia Nada, S.Pd.</option>
          <option value="M. Imron, S.Pd.">M. Imron, S.Pd.</option>
          <option value="Yoga Nugraha, S.Pd">Yoga Nugraha, S.Pd</option>
          <option value="Haryo Guntoro Wicaksono, M.Pd.">Haryo Guntoro Wicaksono, M.Pd.</option>
        </select>
      </div>
    </div>
  );
};

export default DaftarGuruTatib;
