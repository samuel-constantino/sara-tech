import Header from "@/components/Header/Header";
import Toggle from "@/components/Toggle/Toggle";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

export default function Plant() {
    const [automatic, setAutomatic] = useState(true);
    const [irrigation, setIrrigation] = useState(false);

    useEffect(() => {
        // fetch(`/api/irrigation?status=${irrigation}`).then((res) => res.json());
    }, [irrigation]);

    useEffect(() => {
        if(!automatic) return;
    }, [automatic]);

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
                <Toggle label={'Automático'} target={automatic} setTarget={setAutomatic} disabled={false}/>

                <Toggle label={'Irrigação'} target={irrigation} setTarget={setIrrigation} disabled={automatic}/>
            </main>
        </>
    )
}
