// pages/api/teachers.js
import supabase from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch data dari tabel "teachers"
      const { data, error } = await supabase
        .from('guru')
        .select('nama_lengkap');

      if (error) {
        throw error;
      }

      res.status(200).json({ success: true, teachers: data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
