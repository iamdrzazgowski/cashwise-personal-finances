'use client';

import * as React from 'react';
import {
    ArrowRightLeft,
    Home,
    LifeBuoy,
    PiggyBank,
    Send,
    Target,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Logo } from './logo';

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: Home,
        },
        {
            title: 'Transactions',
            url: '/dashboard/transactions',
            icon: ArrowRightLeft,
        },
        {
            title: 'Goals',
            url: '/dashboard/goals',
            icon: Target,
        },
    ],
    navSecondary: [
        {
            title: 'Support',
            url: '#',
            icon: LifeBuoy,
        },
        {
            title: 'Feedback',
            url: '#',
            icon: Send,
        },
    ],
};

interface UserData {
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    userData: UserData;
}

export function AppSidebar({ userData, ...props }: AppSidebarProps) {
    return (
        <Sidebar variant='inset' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg'>
                            <Link href='/dashboard'>
                                {/* <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                                    <PiggyBank className='size-4' />
                                </div>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>
                                        CashWise
                                    </span>
                                </div> */}
                                <Logo className='h-8 w-auto' />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavSecondary items={data.navSecondary} className='mt-auto' /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        name: userData.name,
                        email: userData.email,
                        avatar: userData.image ?? '',
                    }}
                />
            </SidebarFooter>
        </Sidebar>
    );
}
