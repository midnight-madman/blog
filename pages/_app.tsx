import type {AppProps} from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {GitHubIcon, ThemeIcon} from '../icons';
import 'tailwindcss/tailwind.css';
import '../styles/font.css';
import '../styles/global.css';
import {classNames} from '../scripts/utils';

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();

    // Create theme and background state
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // // Track Analytics pageviews when route changes
    // useEffect(() => {
    //     router.events.on('routeChangeComplete', trackAnalyticsPageview);
    //     return () => {
    //         router.events.off('routeChangeComplete', trackAnalyticsPageview);
    //     };
    // }, [router.events]);

    // Set initial theme based on user's prefers color scheme
    useEffect(() => {
        setTheme(
            window?.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        );
    }, []);

    // Add or remove dark class when theme changes
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const isIndexPage = router.asPath === '/';

    return <>
        <Head>
            {/*<meta name="theme-color" content={bgColor}/>*/}
            {/*<meta name="msapplication-TileColor" content={bgColor}/>*/}
        </Head>
        <div className={classNames(
            isIndexPage ? 'via-slate-100 to-sky-100 dark:via-slate-800 dark:to-sky-900' : '',
            "relative bg-gradient-to-b from-slate-100 dark:from-slate-800 "
        )}>
            <header
                className="w-full fixed z-20 top-0 left-0 bg-slate-100 dark:bg-slate-800 bg-opacity-60 dark:bg-opacity-60 backdrop-blur p-4 md:p-5 lg:py-6 lg:px-10">
                <nav className="flex justify-between">
                    <Link
                        href="/"
                        className="prevent-default max-w-[45%] p-3 -m-3 text-base sm:text-lg lg:text-xl text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                        Midnight Madman
                    </Link>
                    <div
                        className="flex items-center space-x-3 sm:space-x-6 md:space-x-8 lg:space-x-10 text-gray-600 dark:text-gray-400">
                        <a
                            className="prevent-default p-3 -m-3 text-base lg:text-lg hover:text-gray-800 dark:hover:text-gray-200"
                            href="/rss.xml"
                            target="_blank"
                            rel="noreferrer"
                        >
                            RSS
                        </a>

                        <button
                            className="w-4 lg:w-5 h-4 lg:h-5 box-content p-3 -m-3 hover:text-gray-800 dark:hover:text-gray-200"
                            onClick={(e) => {
                                e.preventDefault();
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }}
                            type="button"
                        >
                            <ThemeIcon/>
                        </button>
                    </div>
                </nav>
            </header>

            <main className="min-h-screen container pt-28 md:pt-36 lg:pt-44 pb-16 md:pb-24 lg:pb-32">
                <Component {...pageProps} />
            </main>

            <footer
                className="md:flex md:justify-between text-gray-500 space-y-2 md:space-y-0 px-4 pb-6 md:px-5 md:pb-4 lg:px-10 lg:pb-5">
                <div>&copy; Copyright {new Date().getFullYear()} Midnight Madman</div>
                <div className="text-sm md:text-base leading-loose">
                    <a
                        className="prevent-default space-x-1"
                        href="https://github.com/midnight-madman/blog"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GitHubIcon className="h-5 md:h-6 inline"/>{' '}
                        <span className="underline">Source Code</span>
                    </a>
                </div>
            </footer>
        </div>
    </>;
}

export default MyApp;
