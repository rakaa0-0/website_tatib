'use client';


import Image from 'next/image';

import { useState } from 'react';
export default function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };
  

  return (
    <div className="flex max-h-screen 100">
      <div className="flex-1 flex flex-col px-6 py-5 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <Image
            className="h-14 w-auto"
            src="/Logosmk.svg"
            alt="TATA TERTIB Logo"
            width={40}
            height={40}
          />
          <h2 className="mt-20 text-center text-2xl font-semibold leading-9 tracking-tight text">
            Masuk
          </h2>
          <p className="text-center text-sm text">
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
                required
                className="block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                className="block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="mt-10 flex w-full justify-center rounded-xl bg-[#5662C2] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
          alt="School building"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}