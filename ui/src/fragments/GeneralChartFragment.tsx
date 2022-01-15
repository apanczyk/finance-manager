import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DataService from '../service/api/DataService';
import GroupedOperation from '../model/GroupedOperation';
import Operation from '../model/Operation';


interface ChartProps {
    wallet: string,
    operations: Array<Operation>
}

export default function GeneralChartFragment(props: ChartProps) {
    const [countedOperations, setCountedOperations] = React.useState<Array<GroupedOperation>>();
    const { wallet, operations } = props
    const [diagramType, setDiagramType] = React.useState<string>("last year")

    const changeDiagramType = () => {
        if (diagramType === "last year")
            setDiagramType("month")
        else setDiagramType("last year")
    }

    React.useEffect(() => {
        DataService.getGeneral(wallet)
            .then(response => {
                setCountedOperations(response.data)
            }
            ).catch(e => {
                setCountedOperations(undefined)
                console.log(e);
            });
    }, [operations, diagramType]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant="h5" component="h1">
                    General summary of the {diagramType}
                </Typography >
                <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-end" spacing={0}>
                    <Button color="primary" onClick={() => changeDiagramType()}>Change diagram</Button>
                </Grid>
                <ResponsiveContainer aspect={3}>
                    <LineChart
                        width={150}
                        height={150}
                        data={countedOperations}
                        margin={{
                            top: 15,
                            right: 30,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid horizontal={true} stroke="#243240" />
                        <XAxis interval={diagramType === "last year" ? 0 : 2} dataKey="month" tick={{ fill: "#000" }} />
                        <YAxis tick={{ fill: "#000" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false} />
                        <Line type="monotone" dataKey="total" stroke="#344feb" strokeWidth="3" dot={{ fill: "#e8e831", stroke: "#8884d8", strokeWidth: 1, r: 3 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 3, r: 5 }} />
                        <Line type="monotone" dataKey="change" stroke="#cc49c3" strokeWidth="3" dot={{ fill: "#e8e831", stroke: "#8884d8", strokeWidth: 1, r: 3 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 3, r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}