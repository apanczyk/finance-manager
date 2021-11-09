import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'January',
        Spend: 4000
    },
    {
        name: "March",
        Spend: 1000,
    },
    {
        name: "May",
        Spend: 4000,
    },
    {
        name: "July",
        Spend: 800,
    },
    {
        name: "October",
        Spend: 1500,
    },
];

export default function ChartFragment() {
    return (
        <>
            <h2>Money spendings during last year</h2>
            <ResponsiveContainer aspect={3}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid horizontal={true} stroke="#243240" />
                    <XAxis dataKey="name" tick={{ fill: "#000" }} />
                    <YAxis tick={{ fill: "#000" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false} />
                    <Line type="monotone" dataKey="Spend" stroke="#8884d8" strokeWidth="5" dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }} />

                </LineChart>
            </ResponsiveContainer>
        </>
    );
}