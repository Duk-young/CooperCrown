import { HorizontalBar } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

const GenderGraph = (props) => {
    const { customers } = props;
    const [chartData, setChartData] = useState(false);
    const [options, setOptions] = useState(false);

    const getAgeIndex = (date) => {
        const age = new Date(Date.now() - date.getTime()).getUTCFullYear() - 1970;
        if (age >= 90) {
            return 0;
        } else if (age >= 85) {
            return 1;
        } else if (age >= 80) {
            return 2;
        } else if (age >= 75) {
            return 3;
        } else if (age >= 70) {
            return 4;
        } else if (age >= 65) {
            return 5;
        } else if (age >= 60) {
            return 6;
        } else if (age >= 55) {
            return 7;
        } else if (age >= 50) {
            return 8;
        } else if (age >= 45) {
            return 9;
        } else if (age >= 40) {
            return 10;
        } else if (age >= 35) {
            return 11;
        } else if (age >= 30) {
            return 12;
        } else if (age >= 25) {
            return 13;
        } else if (age >= 20) {
            return 14;
        } else if (age >= 15) {
            return 15;
        } else if (age >= 10) {
            return 16;
        } else if (age >= 5) {
            return 17;
        } else {
            return 18;
        }
    }


    useEffect(() => {
        let data = {
            labels: ["90+", "85-89", "80-84", "75-79", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49",
                "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"],
            datasets: [
                {
                    label: 'Male',
                    backgroundColor: 'rgba(0, 0, 0, 0.87)',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
                {
                    label: 'Female',
                    backgroundColor: 'rgba(97, 218, 251, 1)',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
            ],
        };

        customers.forEach((customer) => {
            const dob = customer?.dob ? customer?.dob.toDate() : 0;
            if (dob) {
                if (customer?.gender === 'Male') {
                    data.datasets[0].data[getAgeIndex(dob)] += 1;
                } else if (customer?.gender === 'Female') {
                    data.datasets[1].data[getAgeIndex(dob)] -= 1;
                }
            }
        });

        setChartData(data)

        let draftOptions = {
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'right',
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        ticks: {
                            min: -10,
                            max: 10,
                            beginAtZero: true,
                            callback: (value) => Math.abs(value),
                        },
                        maxTicksLimit: 2
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: (tooltipItem, data) => {
                        const datasetLabel =
                            data.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + Math.abs(tooltipItem.value);
                    },
                },
                itemSort: (a, b) => b.value - a.value,
            },
        }

        const maleMax = Math.max(...data.datasets[0].data)
        const femaleMax = (Math.min(...data.datasets[1].data)) * -1
        draftOptions.scales.xAxes[0].ticks.min = maleMax > femaleMax ? maleMax * -1 : femaleMax * -1
        draftOptions.scales.xAxes[0].ticks.max = maleMax > femaleMax ? maleMax : femaleMax

        setOptions(draftOptions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customers]);



    if (!chartData || !options) return <FuseLoading />;

    return (
        <Card className="w-full rounded-8 shadow-none border-1">
            <Typography className="h2 pl-20" color="textSecondary">
                {'Age and Gender Distribution'}
            </Typography>
            <HorizontalBar
                data={chartData}
                options={options}
                height={300}
            />
        </Card>
    );
};

export default GenderGraph;
