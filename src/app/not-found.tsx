import Link from 'next/link';
import { FileQuestion, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-background px-4'>
            <div className='relative flex max-w-md flex-col items-center gap-6 text-center'>
                <div className='absolute -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl' />

                <div className='flex h-32 w-32 items-center justify-center rounded-4xl border bg-muted/40'>
                    <SearchX
                        className='h-16 w-16 text-muted-foreground'
                        strokeWidth={1.5}
                    />
                </div>

                <div className='space-y-3'>
                    <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                        Page not found
                    </h1>
                    <p className='text-muted-foreground'>
                        Sorry, the page you’re looking for doesn’t exist, was
                        moved, or is temporarily unavailable.
                    </p>
                </div>

                <div className='flex gap-3 pt-2'>
                    <Button asChild size='lg'>
                        <Link href='/dashboard'>Go to Dashboard</Link>
                    </Button>

                    <Button asChild size='lg' variant='outline'>
                        <Link href='/'>Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
