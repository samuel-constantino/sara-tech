import Header from "@/components/Header/Header";
import { api } from "@/services"
import Head from "next/head";
import React, { useState } from "react";

type Props = {
    environments: [Environment],
}
  
type Environment = {
    _id: String;
    temperature: String;
    moisture: String;
    date: String;
}

export default function Environment(props: Props) {
    const { environments } = props;

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
                <ul>
                    {environments.map((env) => (
                        <li className="flex gap-4">
                            <span>Temperatura: {env.temperature}</span>
                            <span>Umidade: {env.moisture}</span>
                            <span>Data: {env.date.substring(0, 10)}</span>
                            <span>Hora: {env.date.substring(11, 19)}</span>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const { data } = await api.get((`/api/environments`));

        return {
            props: { environments: JSON.parse(JSON.stringify(data))},
        };
    } catch (e) {
        console.error(e);
    }
}