import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export default async function Dashboard() {
    const session = await auth.api.getSession({ headers: await headers() });
    console.log(session);
    return <div>Dashboard</div>;
}
