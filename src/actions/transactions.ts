'use server';

import { TransactionFormData } from '@/components/transaction-form';
import { auth } from '@/lib/auth';
import { transactionRepository } from '@/lib/repositories/transaction.repository';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function createTransactionAction(data: TransactionFormData) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) throw new Error('There is no valid session');

    const date = new Date(data.date);
    const transactionData = {
        ...data,
        date,
    };

    await transactionRepository.create(session.user.id, transactionData);
    revalidatePath('/dashboard/transactions');
}

export async function deleteTransactionAction(transactionId: string) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) throw new Error('There is no valid session');

    await transactionRepository.delete(session.user.id, transactionId);
    revalidatePath('/dashboard/transactions');
}
