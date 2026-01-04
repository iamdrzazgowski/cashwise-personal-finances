'use client';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontalIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteTransactionAction } from '@/actions/transactions';
import EditTransactionDialog from './edit-transaction-dialog';
import { useState } from 'react';

interface Transaction {
    id: string;
    type: 'INCOME' | 'EXPENSE';
    title: string;
    category: string;
    amount: number;
    date: Date;
    note: string | null;
}

export function TransactionsTable({
    transactionsData,
}: {
    transactionsData: Transaction[];
}) {
    const [editTransaction, setEditTransaction] = useState<Transaction | null>(
        null
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).format(amount);
    };

    const formatDate = (date: Date | string): string => {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;

        return new Intl.DateTimeFormat('pl-PL', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(parsedDate);
    };

    return (
        <div className='w-full'>
            <Table>
                <TableHeader>
                    <TableRow className='hover:bg-transparent border-border'>
                        <TableHead className='font-semibold text-muted-foreground'>
                            Title
                        </TableHead>
                        <TableHead className='font-semibold text-muted-foreground'>
                            Category
                        </TableHead>
                        <TableHead className='font-semibold text-muted-foreground'>
                            Date
                        </TableHead>
                        <TableHead className='text-right font-semibold text-muted-foreground'>
                            Amount
                        </TableHead>
                        <TableHead className='w-[50px]'></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactionsData.map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            className='border-border hover:bg-muted/50 transition-colors'>
                            <TableCell>
                                <div className='flex items-center gap-3'>
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                            transaction.type === 'INCOME'
                                                ? 'bg-income/10 text-income'
                                                : 'bg-destructive/10 text-destructive'
                                        }`}>
                                        {transaction.type === 'INCOME' ? (
                                            <ArrowDownIcon className='h-5 w-5' />
                                        ) : (
                                            <ArrowUpIcon className='h-5 w-5' />
                                        )}
                                    </div>
                                    <div>
                                        <div className='font-medium text-foreground whitespace-normal wrap-break-word'>
                                            {transaction.title}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className='text-muted-foreground'>
                                {transaction.category}
                            </TableCell>
                            <TableCell className='text-muted-foreground'>
                                {formatDate(transaction.date)}
                            </TableCell>
                            <TableCell className='text-right'>
                                <span
                                    className={`font-semibold ${
                                        transaction.type === 'INCOME'
                                            ? 'text-income'
                                            : 'text-destructive'
                                    }`}>
                                    {transaction.type === 'INCOME' ? '+' : '-'}
                                    {formatCurrency(transaction.amount)}
                                </span>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant='ghost'
                                            size='icon'
                                            className='h-8 w-8'>
                                            <MoreHorizontalIcon className='h-4 w-4' />
                                            <span className='sr-only'>
                                                Open menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align='end'
                                        className='w-[160px] cursor-pointer'>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                setEditTransaction(transaction)
                                            }
                                            className='cursor-pointer'>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                deleteTransactionAction(
                                                    transaction.id
                                                )
                                            }
                                            className='text-destructive cursor-pointer'>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {editTransaction && (
                <EditTransactionDialog
                    open={!!editTransaction}
                    setOpen={(open) => {
                        if (!open) setEditTransaction(null);
                    }}
                    transactionData={editTransaction}
                    key={editTransaction.id}
                />
            )}
        </div>
    );
}
