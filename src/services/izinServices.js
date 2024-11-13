// services/izinService.js
import { supabase } from '../lib/supabaseClient';

// Fungsi untuk mendapatkan jumlah izin hari ini
export const getIzinHariIni = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString(); // Awal hari
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // Akhir hari

  const { data, error } = await supabase
    .from('izin')
    .select('id', { count: 'exact' })
    .gte('created_at', startOfDay) // Filter untuk waktu mulai
    .lte('created_at', endOfDay); // Filter untuk waktu akhir

  if (error) {
    console.error('Error fetching izin hari ini:', error);
    return 0; // Kembalikan 0 jika ada error
  }

  return data.length; // Mengembalikan jumlah izin
};

// Fungsi untuk mendapatkan jumlah izin keseluruhan
export const getTotalIzin = async () => {
  const { data, error } = await supabase
    .from('izin')
    .select('id', { count: 'exact' });

  if (error) {
    console.error('Error fetching total izin:', error);
    return 0; // Kembalikan 0 jika ada error
  }

  return data.length; // Mengembalikan jumlah izin
};