import Header from '@/components/Header/Header';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sara Tech</title>
        <meta name="description" content="Sistemas de Automação Residencial e Agrícola" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='mx-4'>
        <div className='flex flex-col items-center justify-center mt-4'>
          <h1 className='text-3xl font-bold underline mb-4'>SARA TECH</h1>
          <p>Sistemas de Automação Residencial e Agrícola</p>
        </div>
      </main>
    </div>
  );
}