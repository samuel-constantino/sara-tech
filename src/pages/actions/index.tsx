import Header from "@/components/Header/Header";
import { api } from "@/services"
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Toggle from "@/components/Toggle/Toggle";
import TimeInput from "@/components/TimeInput/TimeInput";

type Action = {
    _id: string,
    action1: {
        toggle: Number,
        time1: string,
        time2: string,
        time3: string,
        interval: string,
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
    
    const [toggle1, setToggle1] = useState(action.action1.toggle);

    const [time1, setTime1] = useState(action.action1.time1);
    const [time2, setTime2] = useState(action.action1.time2);
    const [time3, setTime3] = useState(action.action1.time3);
    const [interval1, setInterval1] = useState("");

    const onSubmit = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        const payload = {
            action1: {
                toggle: toggle1,
                time1: time1,
                time2: time2,
                time3: time3,
                interval: interval1,
            },
            date: formattedDate,
            time: formattedTime,
        }

        try {
            const url = "/api/mqtt/actions";
            console.log(payload);
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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Toggle
                            label={'Motor 1'}
                            target={toggle1}
                            setTarget={() => setToggle1(!toggle1)}
                            disabled={false}
                        />
                        <div className="w-100 flex justify-between gap-2">
                            <TimeInput setTime={setTime1} defaultValue={action.action1.time1 || "00:00"} />
                            <TimeInput setTime={setTime2} defaultValue={action.action1.time2 || "00:00"}/>
                            <TimeInput setTime={setTime3} defaultValue={action.action1.time3 || "00:00"}/>
                        </div>
                        <div className="w-100 flex justify-between gap-2">
                            <span>Intervalo:</span>
                            <TimeInput setTime={setInterval1} defaultValue={action.action1.interval || "00:00"}/>
                        </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>Salvar</button>
                </div>
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