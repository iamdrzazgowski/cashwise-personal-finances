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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TransactionType = 'income' | 'expense';

interface Transaction {
    id: string;
    description: string;
    category: string;
    amount: number;
    type: TransactionType;
    date: string;
}

// Sample data
const transactions: Transaction[] = [
    {
        id: '1',
        description: 'Wynagrodzenie',
        category: 'Pensja',
        amount: 5000.0,
        type: 'income',
        date: '2025-12-24',
    },
    {
        id: '2',
        description: 'Zakupy spożywcze',
        category: 'Żywność',
        amount: 320.5,
        type: 'expense',
        date: '2025-12-23',
    },
    {
        id: '3',
        description: 'Abonament Netflix',
        category: 'Rozrywka',
        amount: 49.0,
        type: 'expense',
        date: '2025-12-22',
    },
    {
        id: '4',
        description: 'Sprzedaż online',
        category: 'Dodatkowy dochód',
        amount: 850.0,
        type: 'income',
        date: '2025-12-21',
    },
    {
        id: '5',
        description: 'Rachunki za prąd',
        category: 'Rachunki',
        amount: 180.0,
        type: 'expense',
        date: '2025-12-20',
    },
    {
        id: '6',
        description: 'Restauracja',
        category: 'Jedzenie na mieście',
        amount: 125.5,
        type: 'expense',
        date: '2025-12-19',
    },
    {
        id: '7',
        description: 'Zwrot podatku',
        category: 'Zwrot',
        amount: 450.0,
        type: 'income',
        date: '2025-12-18',
    },
    {
        id: '8',
        description: 'Ubezpieczenie samochodu',
        category: 'Transport',
        amount: 280.0,
        type: 'expense',
        date: '2025-12-17',
    },
];

export function TransactionsTable() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pl-PL', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <div className='w-full'>
            <Table>
                <TableHeader>
                    <TableRow className='hover:bg-transparent border-border'>
                        <TableHead className='font-semibold text-muted-foreground'>
                            Opis
                        </TableHead>
                        <TableHead className='font-semibold text-muted-foreground'>
                            Kategoria
                        </TableHead>
                        <TableHead className='font-semibold text-muted-foreground'>
                            Data
                        </TableHead>
                        <TableHead className='text-right font-semibold text-muted-foreground'>
                            Kwota
                        </TableHead>
                        <TableHead className='w-[50px]'></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            className='border-border hover:bg-muted/50 transition-colors'>
                            <TableCell>
                                <div className='flex items-center gap-3'>
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                            transaction.type === 'income'
                                                ? 'bg-income/10 text-income'
                                                : 'bg-destructive/10 text-destructive'
                                        }`}>
                                        {transaction.type === 'income' ? (
                                            <ArrowDownIcon className='h-5 w-5' />
                                        ) : (
                                            <ArrowUpIcon className='h-5 w-5' />
                                        )}
                                    </div>
                                    <div>
                                        <div className='font-medium text-foreground'>
                                            {transaction.description}
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
                                        transaction.type === 'income'
                                            ? 'text-income'
                                            : 'text-destructive'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'}
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
                                                Otwórz menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align='end'
                                        className='w-[160px]'>
                                        <DropdownMenuLabel>
                                            Akcje
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Edytuj
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Duplikuj
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className='text-destructive'>
                                            Usuń
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
