import Header from "@/components/Header/Header";
import { api } from "@/services"
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Toggle from "@/components/Toggle/Toggle";
import TimeInput from "@/components/TimeInput/TimeInput";

type Action = {
    _id: string,
    action1: {
        toggle: Number,
        time1: string,
        time2: string,
        time3: string,
    },
    action2: {
        toggle: Number,
        time1: string,
        time2: string,
        time3: string,
    },
    action3: {
        toggle: Number,
        time1: string,
        time2: string,
        time3: string,
    },
    date: string,
    time: string,
}

type Props = {
    action: Action,
}

export default function Environment(props: Props) {
    const { action } = props;
    console.log(action);
    const [action1, setAction1] = useState(false);
    
    useEffect(() => {
        setAction1(!!action.action1.toggle);
    },[action]);

    const handleAction1 = () => {
        setAction1((prevState) => (!prevState));

        const payload = action1 ? 1 : 0;

        fetch(`/api/actions?action=action1?payload=${payload}`).then((res) => res.json());
    };

    const onSubmit = () => {
        console.log('submit click');
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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Toggle
                            label={'Motor 1'}
                            target={action1}
                            setTarget={handleAction1}
                            disabled={false}
                        />
                        <div className="flex gap-2">
                            <TimeInput defaultValue={action.action1.time1} />
                            <TimeInput defaultValue={action.action1.time2}/>
                            <TimeInput defaultValue={action.action1.time3}/>
                        </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Salvar</button>
                </div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    try {
        const { data } = await api.get((`/api/actions`));

        return {
            props: { action: data},
            revalidate: 1
        };
    } catch (e) {
        console.error(e);
    }
}