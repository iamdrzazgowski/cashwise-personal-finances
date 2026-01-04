type StatCardProps = {
    title: string;
    value: number;
    variant?: 'balance' | 'income' | 'expense';
    icon?: React.ReactNode; // opcjonalnie ikona
};

export default function StatCard({
    title,
    value,
    variant = 'balance',
    icon,
}: StatCardProps) {
    const formatted = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    }).format(value);

    const variantStyles = {
        balance: 'text-foreground',
        income: 'text-income',
        expense: 'text-destructive',
    };

    return (
        <div
            className={`flex flex-col justify-between p-6 rounded-xl shadow-sm h-full ${variantStyles[variant]}`}>
            <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-muted-foreground'>
                    {title}
                </span>
                {icon && <div className='w-6 h-6'>{icon}</div>}
            </div>

            <span className='mt-2 text-2xl font-bold'>{formatted}</span>
        </div>
    );
}
