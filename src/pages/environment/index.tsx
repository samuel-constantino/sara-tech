import Header from "@/components/Header/Header";
import Head from "next/head";
import React, { useState } from "react";

interface props {
    temperature: String,
    moisture: String,
}

export default function Environment(props: props) {
    const { temperature, moisture} = props;

    return (
        <>
            <Head>
                <title>Sara Tech</title>
                <meta name="description" content="Sistemas de Automação Residencial e Agrícola" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='m-4 flex flex-col gap-4'>
                <p>Temperatura: {temperature}</p>
                <p>Umidade: {moisture}</p>
            </main>
        </>
    )
}

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`/api/environment`);
//     const data = await res.json();
//     const { temperature, moisture } = data;

//     // Pass data to the page via props
//     return { props: {
//         temperature,
//         moisture,
//     } }
// }
