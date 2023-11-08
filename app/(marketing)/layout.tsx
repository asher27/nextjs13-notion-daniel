import { PropsWithChildren } from 'react';
import Navbar from './_components/navbar';

const MarketingLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className='h-full dark:bg-[#1F1F1F]'>
            <Navbar />
            <div className='h-full pt-40'>{children}</div>
        </div>
    );
};

export default MarketingLayout;