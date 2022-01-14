import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import DataService from '../service/api/DataService';
import GroupedOperation from '../model/GroupedOperation';
import Operation from '../model/Operation';
import CloseIcon from '@mui/icons-material/Close';
import MonthDiagram from '../model/MonthDiagram';
import { COLORS, months } from '../util/Utils';

interface ChartProps {
    wallet: string,
    operations: Array<Operation>
}

export default function ChartFragment(props: ChartProps) {
    const [groupedOperations, setGroupedOperations] = React.useState<Array<GroupedOperation>>();
    const [monthDiagram, setMonthDiagram] = React.useState<Array<MonthDiagram>>();
    const { wallet, operations } = props
    const [modal, setModal] = React.useState<boolean>(false)
    const [month, setMonth] = React.useState<string>()
    const [diagramType, setDiagramType] = React.useState<string>("last year")

    const monthClick = (event: any) => {
        if (event && months.includes(event.activeLabel)) {
            DataService.getMonthDiagram(wallet, event.activeLabel)
                .then(response => {
                    setMonthDiagram(response.data)
                    setMonth(event.activeLabel)
                    setModal(true)
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else setModal(false)
    };

    const changeDiagramType = () => {
        if (diagramType === "last year")
            setDiagramType("month")
        else setDiagramType("last year")
    }

    React.useEffect(() => {
        DataService.getGroupedOperations(wallet, diagramType)
            .then(response => {
                setGroupedOperations(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [operations, diagramType]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant="h5" component="h1">
                    Money spendings during {diagramType}
                </Typography >
                <Button color="primary" onClick={() => changeDiagramType()}>Change diagram</Button>
                <ResponsiveContainer aspect={3}>
                    <LineChart
                        onClick={monthClick}
                        width={150}
                        height={150}
                        data={groupedOperations}
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
                        <Line type="monotone" dataKey="cost" stroke="#ff8080" strokeWidth="4" dot={{ fill: "#bf3f3f", stroke: "#8884d8", strokeWidth: 2, r: 5 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }} />
                        <Line type="monotone" dataKey="income" stroke="#80ff86" strokeWidth="4" dot={{ fill: "#3fbf41", stroke: "#8884d8", strokeWidth: 2, r: 5 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            {monthDiagram && (
                <Dialog
                    open={modal}
                    fullWidth
                >
                    <DialogTitle>
                        <div style={{ display: 'flex' }}>
                            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                                Chart for {month}
                            </Typography>
                            <Button
                                color="secondary"
                                onClick={() => {
                                    setMonth(undefined)
                                    setModal(false)
                                }}
                            ><CloseIcon />
                            </Button>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            {monthDiagram.length !== 0 &&
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart width={450} height={300}>
                                        <Pie data={monthDiagram} color="#000000" dataKey="cost" nameKey="category" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                                            {
                                                monthDiagram!.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                            }
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            }
                            {monthDiagram.length === 0 &&
                                <Typography component="h2" variant="h6">{"No data found for this month"}</Typography>
                            }
                        </Box>
                    </DialogContent >
                </Dialog >
            )}
        </>
    );
}