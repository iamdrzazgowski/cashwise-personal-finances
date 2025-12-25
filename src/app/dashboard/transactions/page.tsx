import { TransactionsTable } from '@/components/transactions-table';
import { Card, CardContent } from '@/components/ui/card';

export default function TransactionPage() {
    return (
        <div className='min-h-screen bg-background p-4 md:p-8'>
            <div className='mx-auto max-w-7xl space-y-6'>
                <Card className='border-border'>
                    <CardContent className='p-0'>
                        <TransactionsTable />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
