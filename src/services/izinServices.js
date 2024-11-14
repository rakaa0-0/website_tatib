import { supabase } from '../lib/supabaseClient';


export const getIzinHariIni = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString(); 
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString(); 

  const { data, error } = await supabase
    .from('izin')
    .select('id', { count: 'exact' })
    .gte('created_at', startOfDay) 
    .lte('created_at', endOfDay); 

  if (error) {
    console.error('Error fetching izin hari ini:', error);
    return 0; 
  }

  return data.length; 
};


export const getTotalIzin = async () => {
  const { data, error } = await supabase
    .from('izin')
    .select('id', { count: 'exact' });

  if (error) {
    console.error('Error fetching total izin:', error);
    return 0; 
  }

  return data.length; 
};