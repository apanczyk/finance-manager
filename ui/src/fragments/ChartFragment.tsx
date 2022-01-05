import { Box, Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DataService from '../api/DataService';
import GroupedOperation from '../model/GroupedOperation';

interface ChartProps {
    wallet: string
}

export default function ChartFragment(props: ChartProps) {
    const [operations, setOperations] = React.useState<Array<GroupedOperation>>();
    const { wallet } = props

    React.useEffect(() => {
        DataService.getGroupedOperations(wallet)
            .then(response => {
                setOperations(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [wallet]);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant="h5" component="h1">
                    Money spendings during last year
                </Typography >
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
                        <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth="5" dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}