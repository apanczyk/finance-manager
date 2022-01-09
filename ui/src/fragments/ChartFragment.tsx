import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Sector, Legend, Cell } from 'recharts';
import DataService from '../service/api/DataService';
import GroupedOperation from '../model/GroupedOperation';
import Operation from '../model/Operation';
import CloseIcon from '@mui/icons-material/Close';

interface ChartProps {
    wallet: string,
    operations: Array<Operation>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const pieData = [
    {
        "name": "Chrome",
        "value": 68.85
    },
    {
        "name": "Firefox",
        "value": 7.91
    },
    {
        "name": "Edge",
        "value": 6.85
    },
    {
        "name": "Internet Explorer",
        "value": 6.14
    },
    {
        "name": "Others",
        "value": 10.25
    }
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
            </div>
        );
    }

    return null;
};

export default function ChartFragment(props: ChartProps) {
    const [groupedOperations, setGroupedOperations] = React.useState<Array<GroupedOperation>>();
    const { wallet, operations } = props
    const [modal, setModal] = React.useState<boolean>(false)
    const [month, setMonth] = React.useState<string>()

    const monthClick = (event: any) => {
        if (event.activeLabel) {
            setMonth(event.activeLabel)
            setModal(true)
        }
        else setModal(false)
    };

    React.useEffect(() => {
        DataService.getGroupedOperations(wallet)
            .then(response => {
                setGroupedOperations(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [operations]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant="h5" component="h1">
                    Money spendings during last year
                </Typography >
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
                        <XAxis dataKey="month" tick={{ fill: "#000" }} />
                        <YAxis tick={{ fill: "#000" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false} />
                        <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth="5" dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }} activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>



            <Dialog
                open={modal}
                maxWidth="md"
                fullWidth >
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
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart width={730} height={300}>
                                <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                                    {
                                        pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </DialogContent >
            </Dialog >
        </>
    );
}