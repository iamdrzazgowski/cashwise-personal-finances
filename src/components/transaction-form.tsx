'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from './ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Controller, useForm, useWatch } from 'react-hook-form';

export interface TransactionFormData {
    type: 'INCOME' | 'EXPENSE';
    title: string;
    category: string;
    amount: number;
    date: string;
    note: string | null;
}

export default function TransactionForm({
    onSuccess,
}: {
    onSuccess: () => void;
}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TransactionFormData>({
        defaultValues: {
            type: 'INCOME',
            note: null,
        },
    });

    const type = useWatch({ control, name: 'type' });

    const onSubmit = (data: TransactionFormData) => {
        console.log(data);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                    <Label htmlFor='type'>Transaction type</Label>
                    <Controller
                        name='type'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='INCOME'>
                                        Income
                                    </SelectItem>
                                    <SelectItem value='EXPENSE'>
                                        Expense
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='title'>Title</Label>
                    <Input
                        id='title'
                        placeholder='e.g. Grocery shopping'
                        {...register('title', {
                            required: true,
                        })}
                    />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='category'>Category</Label>
                    <Controller
                        name='category'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a category' />
                                </SelectTrigger>
                                <SelectContent>
                                    {type === 'INCOME' ? (
                                        <>
                                            <SelectItem value='Salary'>
                                                Salary
                                            </SelectItem>
                                            <SelectItem value='Additional income'>
                                                Additional income
                                            </SelectItem>
                                            <SelectItem value='Refund'>
                                                Refund
                                            </SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value='Food'>
                                                Food
                                            </SelectItem>
                                            <SelectItem value='Transport'>
                                                Transport
                                            </SelectItem>
                                            <SelectItem value='Bills'>
                                                Bills
                                            </SelectItem>
                                            <SelectItem value='Entertainment'>
                                                Entertainment
                                            </SelectItem>
                                            <SelectItem value='Dining out'>
                                                Dining out
                                            </SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='amount'>Amount (PLN)</Label>
                    <Input
                        id='amount'
                        type='number'
                        step='0.01'
                        min='0'
                        placeholder='0.00'
                        {...register('amount', {
                            required: true,
                            valueAsNumber: true,
                        })}
                    />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='date'>Date</Label>
                    <Input
                        id='date'
                        type='date'
                        {...register('date', { required: true })}
                    />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='note'>Note (optional)</Label>
                    <Textarea
                        id='note'
                        placeholder='Additional information...'
                        rows={3}
                        {...register('note')}
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type='submit'>Save changes</Button>
            </DialogFooter>
        </form>
    );
}
