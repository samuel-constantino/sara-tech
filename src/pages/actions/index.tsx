import Header from "@/components/Header/Header";
import { api, datetime } from "@/services"
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { Action } from "@/components";

type ActionProp = {
    _id: string,
    action1: ActionObject,
    action2: ActionObject,
    action3: ActionObject,
    date: string,
    time: string,
}

type ActionObject = {
    toggle: Boolean,
    time1: string,
    time2: string,
    time3: string,
    interval: string,
}

type Props = {
    action: ActionProp,
}

export default function Actions(props: Props) {
    const { action } = props;
    // console.log(action);
    const [action1, setAction1] = useState(action.action1);
    const [action2, setAction2] = useState(action.action2);
    const [action3, setAction3] = useState(action.action3);
    // console.log(action1.toggle, action2.toggle, action3.toggle);

    const onSubmit = async () => {
        const { date, time } = datetime();

        const payload = {
            ac1: {
                to: action1.toggle,
                t1: action1.time1,
                t2: action1.time2,
                t3: action1.time3,
                i: action1.interval,
            },
            ac2: {
                to: action2.toggle,
                t1: action2.time1,
                t2: action2.time2,
                t3: action2.time3,
                i: action2.interval,
            },
            ac3: {
                to: action3.toggle,
                t1: action3.time1,
                t2: action3.time2,
                t3: action3.time3,
                i: action3.interval,
            },
            date: date,
            time: time,
        }

        try {
            const url = "/api/mqtt/actions";
            const { data } = await api.post(url, payload);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
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
                <Action
                    label={"Motor 1"}
                    action={action1}
                    setAction={setAction1}
                    onSubmit={onSubmit}
                />
                <Action
                    label={"Motor 2"}
                    action={action2}
                    setAction={setAction2}
                    onSubmit={onSubmit}
                />
                <Action
                    label={"Motor 3"}
                    action={action3}
                    setAction={setAction3}
                    onSubmit={onSubmit}
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onSubmit()}>Salvar</button>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const { data } = await api.get('/api/mongo/actions');

        return {
            props: { action: data}
        };
    } catch (e) {
        console.error(e);
    }
}