import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const operations = [
    {
        month: 'January',
        Spend: 4000
    },
    {
        month: "February",
        Spend: 1000,
    },
    {
        month: "March",
        Spend: 4000,
    },
    {
        month: "April",
        Spend: 800,
    },
    {
        month: "May",
        Spend: 1500,
    },
    {
        month: 'June',
        Spend: 5000
    },
    {
        month: 'July',
        Spend: 4000
    },
    {
        month: 'August',
        Spend: 2500
    },
];

export default function ChartFragment() {
    return (
        <>
            <h2>Money spendings during last year</h2>
            <ResponsiveContainer aspect={3}>
                <LineChart
                    width={150}
                    height={150}
                    data={operations}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid horizontal={true} stroke="#243240" />
                    <XAxis dataKey="month" tick={{ fill: "#000" }} />
                    <YAxis tick={{ fill: "#000" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false} />
                    <Line type="monotone" dataKey="Spend" stroke="#8884d8" strokeWidth="5" dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}