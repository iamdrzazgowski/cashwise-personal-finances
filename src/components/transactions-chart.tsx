'use client';

import { Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from '@/components/ui/chart';

export const description = 'A donut chart';

function capitalizeFirstLetter(str: string): string {
    if (!str) return ''; // zabezpieczenie dla pustego stringa
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const chartColors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
];

export default function TransactionsChart({
    expenseData,
}: {
    expenseData: { category: string; amount: number }[];
}) {
    const chartData = expenseData.map((item, index) => ({
        category: item.category,
        amount: item.amount,
        fill: chartColors[index % chartColors.length],
    }));

    const chartConfig = {
        amount: {
            label: 'Amount',
        },
        ...expenseData.reduce((acc, item, index) => {
            acc[item.category.toLowerCase()] = {
                label: capitalizeFirstLetter(item.category),
                color: chartColors[index % chartColors.length],
            };
            return acc;
        }, {} as Record<string, { label: string; color: string }>),
    } satisfies ChartConfig;

    return (
        <Card className='flex flex-col border-0 h-full'>
            <CardHeader className='items-center pb-0'>
                <CardTitle>Your Expenses</CardTitle>
                <CardDescription>
                    {new Date().toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
                <ChartContainer
                    config={chartConfig}
                    className='mx-auto aspect-square max-h-[400px]'>
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey='amount'
                            nameKey='category'
                            innerRadius={110}
                            outerRadius={160}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey='category' />}
                            className='mt-6'
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
