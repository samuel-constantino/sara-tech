import Header from "@/components/Header/Header";
import Toggle from "@/components/Toggle/Toggle";
import Head from "next/head";
import React, { useState } from "react";
import Environment from "../environment";

type Props = {
    environments: [Environment]
}
  
type Environment = {
    _id: String;
    temperature: String;
    moisture: String;
    date: String;
}

export default function Plant(props: Props) {
    const [automatic, setAutomatic] = useState(true);
    const [irrigation, setIrrigation] = useState(false);
    const [environments, setEnvironments] = useState(props.environments);

    const handleIrrigation = () => {
        setIrrigation((prevState) => (!prevState));

        const payload = !irrigation ? "1" : "0";

        fetch(`/api/irrigation?status=${payload}`).then((res) => res.json());
    };

    const handleAutomatic = () => {
        console.log(automatic);
        setAutomatic(!automatic);
        console.log(automatic);

        // fetch(`/api/automatic?status=${automatic}`).then((res) => res.json());
    };

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
                {/* <Toggle label={'Automático'} target={automatic} setTarget={handleAutomatic} disabled={false}/> */}

                <Toggle label={'Irrigação'} target={irrigation} setTarget={handleIrrigation} disabled={automatic}/>
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
        let response = await fetch('http://localhost:3000/api/environments');
        let environments = await response.json();
        return {
            props: { environments: JSON.parse(JSON.stringify(environments)) },
        };
    } catch (e) {
        console.error(e);
    }
}