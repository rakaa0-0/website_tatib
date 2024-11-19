import { supabase } from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log("Connecting to Supabase...");
      
      const { data, error } = await supabase
        .from("perizinan_siswa")
        .select("id, nama_lengkap, izin, alasan, action");

      if (error) {
        console.error("Supabase Query Error:", error);
        return res.status(500).json({ error: error.message, details: error });
      }

      console.log("Query successful, data:", data);
      res.status(200).json(data);
    } catch (err) {
      console.error("Unexpected Error:", err);
      res.status(500).json({ error: "Internal Server Error", details: err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
