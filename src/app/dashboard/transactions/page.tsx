import AddTransactionDialog from '@/components/add-transaction-dialog';
import { TransactionsTable } from '@/components/transactions-table';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { transactionRepository } from '@/lib/repositories/transaction.repository';
import { CreditCard } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function TransactionPage() {
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

    return (
        <div className='mx-auto max-w-7xl min-w-6xl space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-foreground'>
                        Transactions
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage your transactions
                    </p>
                </div>
                <AddTransactionDialog />
            </div>

            <Card className='border-border'>
                <CardContent className='p-0'>
                    <div className='flex-1 overflow-y-auto p-4 py-0 max-h-[520px]'>
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
                </CardContent>
            </Card>
        </div>
    );
}
