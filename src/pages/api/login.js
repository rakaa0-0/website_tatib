import { supabase } from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password harus diisi' });
    }

    try {
      
      const { data: user, error } = await supabase
        .from('tatib')
        .select('username, password')
        .eq('username', username)
        .single();

      if (error) {
        throw new Error('Database error saat mencari pengguna');
      }

      if (user && user.password === password) {
        res.status(200).json({ message: 'Login berhasil', userId: user.id });
      } else {
        res.status(401).json({ message: 'Username atau password salah' });
      }

    } catch (error) {
      console.error('Error:', error.message || error); 
      res.status(500).json({ message: 'Terjadi kesalahan saat memproses permintaan' });
    }
  } else {
    
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed. Use POST instead.` });
  }
}