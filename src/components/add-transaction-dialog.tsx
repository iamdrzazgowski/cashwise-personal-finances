'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { PlusIcon } from 'lucide-react';
import TransactionForm from './transaction-form';
import { useState } from 'react';

export default function AddTransactionDialog() {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className='mr-2 h-4 w-4' />
                    Add a transaction
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Add a new transaction here. Fill in the details and
                        click &quot;Add Transaction&quot; when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <TransactionForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
