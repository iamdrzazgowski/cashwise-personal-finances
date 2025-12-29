import prisma from '../prisma';

export const transactionRepository = {
    findByUserId(userId: string) {
        return prisma.transaction.findMany({
            where: {
                userId,
            },
        });
    },
};
