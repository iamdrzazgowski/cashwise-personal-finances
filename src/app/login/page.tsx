import { loginAction } from '@/actions/auth';
import LoginForm from '@/components/login-form';

export default function LoginPage() {
    return (
        <main className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-15 dark:bg-transparent '>
            <LoginForm loginAction={loginAction} />
        </main>
    );
}
