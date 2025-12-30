import prisma from '../prisma';

interface TransactionFormData {
    id: string;
    type: 'INCOME' | 'EXPENSE';
    title: string;
    category: string;
    amount: number;
    date: Date;
    note: string | null;
}

export const transactionRepository = {
    findByUserId(userId: string) {
        return prisma.transaction.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    },
    create(userId: string, transactionData: TransactionFormData) {
        return prisma.transaction.create({
            data: {
                userId,
                ...transactionData,
            },
        });
    },
    delete(userId: string, transactionId: string) {
        return prisma.transaction.delete({
            where: {
                id: transactionId,
                userId: userId,
            },
        });
    },
};
