'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import GoogleLogo from './ui/google-logo';
import { SignUpFormValues } from '@/types/form';
import FormErrorLabel from './ui/form-error';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
    signUpAction: (formData: FormData) => Promise<unknown>;
}

export default function SignUpForm({ signUpAction }: SignUpFormProps) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<SignUpFormValues>();

    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpFormValues> = async ({
        fullName,
        email,
        password,
    }) => {
        const formData = new FormData();

        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);

        startTransition(() => {
            signUpAction(formData)
                .then(() => {
                    router.push('/dashboard');
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]'>
            <div className='bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6'>
                <div className='text-center'>
                    <h1 className='mb-1 mt-4 text-xl font-semibold'>
                        Create a CashWise Account
                    </h1>
                    <p className='text-sm'>
                        Welcome! Create an account to get started
                    </p>
                </div>

                <div className='mt-6 space-y-6'>
                    <div className='space-y-1'>
                        <Label htmlFor='fullname' className='block text-sm'>
                            Fullname
                        </Label>
                        <Input
                            type='text'
                            id='fullname'
                            {...register('fullName', {
                                required: 'This field is required',
                            })}
                            className={`${
                                errors.fullName?.message ? 'border-red-500' : ''
                            }`}
                        />
                        <FormErrorLabel error={errors.fullName?.message} />
                    </div>

                    <div className='space-y-1'>
                        <Label htmlFor='email' className='block text-sm'>
                            E-mail
                        </Label>
                        <Input
                            type='email'
                            id='email'
                            {...register('email', {
                                required: 'This field is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        'Please provide a valid email address',
                                },
                            })}
                            className={`${
                                errors.email?.message ? 'border-red-500' : ''
                            }`}
                        />
                        <FormErrorLabel error={errors.email?.message} />
                    </div>

                    <div className='space-y-1'>
                        <Label htmlFor='pwd' className='text-sm'>
                            Password
                        </Label>

                        <Input
                            type='password'
                            required
                            id='password'
                            {...register('password', {
                                required: 'This field is required',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password needs a minimum of 8 characters',
                                },
                            })}
                            className={`${
                                errors.password?.message ? 'border-red-500' : ''
                            }`}
                        />
                        <FormErrorLabel error={errors.password?.message} />
                    </div>

                    <div className='space-y-1'>
                        <Label htmlFor='rpwd' className='text-sm'>
                            Repeat password
                        </Label>

                        <Input
                            type='password'
                            id='passwordConfirm'
                            {...register('passwordConfirm', {
                                required: 'This field is required',
                                validate: (value) => {
                                    return (
                                        value === getValues().password ||
                                        'Passwords need to match'
                                    );
                                },
                            })}
                            className={`${
                                errors.passwordConfirm?.message
                                    ? 'border-red-500'
                                    : ''
                            }`}
                        />
                        <FormErrorLabel
                            error={errors.passwordConfirm?.message}
                        />
                    </div>

                    <Button type='submit' className='w-full'>
                        {pending ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </div>

                <div className='my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3'>
                    <hr className='border-dashed' />
                    <span className='text-muted-foreground text-xs'>
                        Or continue With
                    </span>
                    <hr className='border-dashed' />
                </div>

                <Button type='button' variant='outline' className='w-full'>
                    <GoogleLogo />
                </Button>
            </div>

            <div className='p-3'>
                <p className='text-accent-foreground text-center text-sm'>
                    Have an account ?
                    <Button asChild variant='link' className='px-2'>
                        <Link href='/login' replace={true}>
                            Sign In
                        </Link>
                    </Button>
                </p>
            </div>
        </form>
    );
}
