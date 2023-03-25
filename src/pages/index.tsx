import Head from 'next/head';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
        <h1 className='text-3xl font-bold underline'>Hello World!</h1>
      </main>
    </>
  )
}
