'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    setErrors({ username: '', password: '' });
    setMessage('');

    
    if (!username) {
      setErrors(prevErrors => ({ ...prevErrors, username: 'Username wajib diisi' }));
    }
    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Password wajib diisi' }));
    }
    if (!username || !password) {
      return;
    }

    const res = await fetch('./api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) { 
    
      router.push('./dashboard'); 
    } else {
      setMessage(data.message); 
      setErrors({ username: data.message.includes('Username') ? 'Username salah' : '', password: data.message.includes('Password') ? 'Password salah' : '' });
    }
  };

  return (
    <div className="flex max-h-screen ">
      <div className="flex-1 flex flex-col align-items-center px-6 py-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:items-center">
          <Image
            className="h-14 w-auto"
            src="/Logosmk.svg"
            alt="TATA TERTIB Logo"
            width={40}
            height={40}
          />
          <h2 className="mt-20 text-center text-2xl font-semibold leading-9 tracking-tight text-[#25318D]">
            Masuk
          </h2>
          <p className="text-center text-sm text-[#25318D]">
            Selamat datang di Website TaTib!
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className={`block w-full rounded-md border-2 px-2 py-2.5 text-gray-900 shadow-sm outline-none 
                  ${errors.username ? 'border-red-500' : 'border-[#4C56AA]'} 
                  focus:border-[#4C56AA] focus:ring-1 focus:ring-[#4C56AA] placeholder:text-[#DBDEF5] sm:text-sm sm:leading-6`}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className={`block w-full rounded-md border-2 px-2 py-2.5 text-gray-900 shadow-sm outline-none 
                  ${errors.password ? 'border-red-500' : 'border-[#4C56AA]'} 
                  focus:border-[#4C56AA] focus:ring-1 focus:ring-[#4C56AA] placeholder:text-[#DBDEF5] sm:text-sm sm:leading-6`}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="mt-10 flex w-full justify-center rounded-md bg-[#5662C2] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Masuk
              </button>
            </div>
          </form>
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <Image
          className="h-full w-full object-cover"
          src="/banner_sekolah.svg"
          alt=""
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
