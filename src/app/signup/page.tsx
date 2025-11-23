import { signUpAction } from '@/actions/auth';
import SignUpForm from '@/components/signup-form';

export default function SignUpPage() {
    return (
        <main className='flex min-h-screen bg-zinc-50 px-4 py-5 md:py-5 dark:bg-transparent'>
            <SignUpForm signUpAction={signUpAction} />
        </main>
    );
}
