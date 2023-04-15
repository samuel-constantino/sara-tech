import Header from "@/components/Header/Header";
import { api } from "@/services"
import Head from "next/head";
import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
)

type Environment = {
  _id: String;
  temperature: String;
  moisture: String;
  date: String;
  time: String;
}

type Props = {
    environments: [Environment],
}

export default function Environment(props: Props) {
    const { environments } = props;
    
    const labels: string[] = [];
    const temperatures: string[] = [];
    const moistures: string[] = [];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperatura',
                data: temperatures,
                fill: false,
                backgroundColor: "rgba(47, 97, 68, 0.3)",
                borderColor: 'rgba(47, 97, 68, 1)',
            },
            {
                label: 'Umidade',
                data: moistures,
                fill: false,
                backgroundColor: "rgba(78, 180, 238, 0.8)",
                borderColor: 'rgba(39, 170, 245, 0.8)',
            },
        ]
    };

    let currentEnvironment = environments[environments.length-1];
    console.log(currentEnvironment);
    environments.forEach(({time, temperature, moisture}) => {

        let timeData = ""+time[0]+""+time[1];
        data.labels.push(timeData);
        data.datasets[0].data.push(""+temperature);
        data.datasets[1].data.push(""+moisture);
    });

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
                <div className="flex gap-2">
                    <span>Temperatura:</span>
                    <span>{currentEnvironment.temperature}ºC</span>
                </div>
                <div className="flex gap-2">
                    <span>Umidade:</span>
                    <span>{currentEnvironment.moisture}ºC</span>
                </div>
                <div>
                    <Line data={data} options={{ maintainAspectRatio: false }} />
                </div>
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