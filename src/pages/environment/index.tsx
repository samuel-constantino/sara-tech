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

type Options = {};

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

    environments.forEach(({time, temperature, moisture}) => {
        data.labels.push(""+time);
        data.datasets[0].data.push(""+temperature);
        data.datasets[1].data.push(""+moisture);
    });

    const options: Options = {
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Gráfico de Ambiente',
        },
        elements: {
            line: {
                tension: 0,
                borderWidth: 2,
                fill: "start",
            },
            point: {
                radius: 0,
                hitRadius: 0,
            },
        },
        scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
              },
              display: false,
            }],
            xAxes: [{
              ticks: {
                display: true,
              },
              gridLines: {
                display: false,
              },
            }],
        },
        // scales: {
        //     yAxes: {
        //         display: false,
        //     },
        //     xAxes: {
        //         display: false,
        //     }
        // },
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
        console.log('antes');
        const { data } = await api.get((`/api/environments`));
        console.log('depois');

        return {
            props: { environments: JSON.parse(JSON.stringify(data))},
        };
    } catch (e) {
        console.error(e);
    }
}