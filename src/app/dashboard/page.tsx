import { TransactionsTable } from '@/components/transactions-table';
import StatCard from '@/components/ui/stat-card';
import { auth } from '@/lib/auth';
import { transactionRepository } from '@/lib/repositories/transaction.repository';
import { CreditCard, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
);

export default async function Dashboard() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect('/login');
    }

    const userTransactions = await transactionRepository.findByUserId(
        session.user.id
    );

    const transactions = userTransactions.map((transaction) => ({
        ...transaction,
        amount: transaction.amount.toNumber(),
    }));

    const stats = transactions.reduce(
        (acc, tx) => {
            const amount = Number(tx.amount);
            const date = new Date(tx.date);

            if (tx.type === 'INCOME') {
                acc.balance += amount;

                if (date >= startOfMonth && date <= endOfMonth) {
                    acc.income += amount;
                }
            }

            if (tx.type === 'EXPENSE') {
                acc.balance -= amount;

                if (date >= startOfMonth && date <= endOfMonth) {
                    acc.expense += amount;
                }
            }

            return acc;
        },
        { balance: 0, income: 0, expense: 0 }
    );

    return (
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
            <div className='grid gap-4 md:grid-cols-3'>
                <div className='bg-muted/50 rounded-xl h-28'>
                    <StatCard
                        title='Balance'
                        value={stats.balance}
                        variant='balance'
                        icon={<Wallet />}
                    />
                </div>

                <div className='bg-muted/50 rounded-xl h-28'>
                    <StatCard
                        title='Income'
                        value={stats.income}
                        variant='income'
                        icon={<TrendingUp />}
                    />
                </div>
                <div className='bg-muted/50 rounded-xl h-28'>
                    <StatCard
                        title='Expense'
                        value={stats.expense}
                        variant='expense'
                        icon={<TrendingDown />}
                    />
                </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2 h-full'>
                <div className='bg-muted/50 rounded-xl h-full flex flex-col'>
                    <div className='flex items-center justify-between px-4 py-3 border-b border-muted'>
                        <h3 className='text-sm font-semibold'>
                            Your Transactions
                        </h3>

                        <Link
                            href='/dashboard/transactions'
                            className='text-xs font-medium text-primary hover:underline'>
                            View all
                        </Link>
                    </div>

                    <div className='flex-1 overflow-y-auto p-4 max-h-[480px] shadow-sm'>
                        {transactions.length > 0 ? (
                            <TransactionsTable
                                transactionsData={transactions}
                            />
                        ) : (
                            <div className='flex h-full flex-col items-center justify-center text-muted-foreground text-sm gap-2'>
                                <CreditCard className='w-12 h-12 text-muted-foreground' />
                                <span>You don’t have any transactions.</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='bg-muted/50 rounded-xl h-full shadow-sm' />
            </div>
        </div>
    );
}
