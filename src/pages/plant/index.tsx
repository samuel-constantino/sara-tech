import Header from "@/components/Header/Header";
import Toggle from "@/components/Toggle/Toggle";
import Head from "next/head";
import React, { useState } from "react";

export default function Plant() {
    const [automatic, setAutomatic] = useState(true);
    const [irrigation, setIrrigation] = useState(false);

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

                <Toggle label={'Irrigação'} target={irrigation} setTarget={handleIrrigation} disabled={false}/>
            </main>
        </>
    )
}
