import Header from "@/components/Header/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Plant() {
  const [irrigation, setIrrigation] = useState(false);

  useEffect(() => {
    fetch(`/api/irrigation?status=${irrigation}`).then((res) => res.json());
  }, [irrigation]);

  return (
    
    <>
    <Head>
        <title>Sara Tech</title>
        <meta name="description" content="Sistemas de Automação Residencial e Agrícola" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='mx-4'>
        <div className="flex justify-center py-4">
          <h1 className='text-3xl font-bold'>Irrigação</h1>
        </div>
        <div className="flex justify-between">
            <span>Ligado: </span>
            <div className="flex">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={irrigation}
                        readOnly
                    />
                    <div
                        onClick={() => setIrrigation(!irrigation)}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                    ></div>
                </label>
            </div>
        </div>
      </main>
    </>
  )
}
