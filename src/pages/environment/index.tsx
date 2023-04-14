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

type Props = {
    environments: [Environment],
}
  
type Environment = {
    _id: String;
    temperature: String;
    moisture: String;
    date: String;
    time: String;
}

export default function Environment(props: Props) {
    const { environments } = props;
    
    const labels: string[] = [];
    const temperatures: string[] = [];
    const moistures: string[] = [];

    const data = {
        labels: labels,
        datasets: [
            { data: temperatures },
            { data: moistures }
        ]
    };

    environments.forEach(({time, temperature, moisture}) => {
        data.labels.push(""+time);
        data.datasets[0].data.push(""+temperature);
        data.datasets[1].data.push(""+moisture);
    });

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            line: {
                tension: 0,
                borderWidth: 2,
                borderColor: "rgba(47, 97, 68, 1)",
                fill: "start",
                backgroundColor: "rgba(47, 97, 68, 0.3)"
            },
            point: {
                radius: 0,
                hitRadius: 0,
            },
        },
        scales: {
            xAxis: {
                display: false,
            },
            yAxis: {
                display: true,
            },
        },
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
                <Line data={data} width={100} height={40} options={options} />
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