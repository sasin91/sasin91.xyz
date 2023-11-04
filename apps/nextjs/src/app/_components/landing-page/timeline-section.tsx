
import { useTranslation } from '~/app/i18n';
import { Lng } from '~/app/i18n/settings';

export default async function TimelineSection({ lang }: { lang: Lng }) {
    const { t } = await useTranslation(lang);

    const timeline = [
        {
            name: t('timeline.webintegrator.name'),
            description: t('timeline.webintegrator.description'),
            date: 'Aug 2015',
            dateTime: '2015-08',
        },
        {
            name: t('timeline.ghc.name'),
            description: t('timeline.ghc.description'),
            date: 'Feb 2017',
            dateTime: '2017-02',
        },
        {
            name: t('timeline.syncronet.name'),
            href: 'https://zometv.com',
            description: t('timeline.syncronet.description'),
            date: 'Feb 2020',
            dateTime: '2020-02',
        },
        {
            name: t('timeline.juice.name'),
            href: 'https://morejuice.io',
            description: t('timeline.juice.description'),
            date: 'Jan 2023',
            dateTime: '2023-01',
        }
    ];

    return (
        <div className="px-6 mx-auto -mt-8 max-w-7xl lg:px-8">
            <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                {timeline.map((item) => (
                    <a
                        key={item.name}
                        className={`transition-all duration-300 ease-in-out group ${!item.href ? 'text-gray-900' : ''}`}
                        target="_blank"
                        href={item.href || '#'}
                    >
                        <time className="flex items-center text-sm font-semibold leading-6 text-cyan-500">
                            <svg viewBox="0 0 4 4" className="flex-none w-1 h-1 mr-4" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            {item.date}
                            <div className="absolute w-screen h-px -ml-2 -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true" />
                        </time>
                        <p className={`mt-6 text-lg font-semibold leading-8 tracking-tight ${item.href ? 'text-cyan-400 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out' : ''}`}>
                            {item.name}
                        </p>
                        <p className="mt-1 text-base leading-7 text-gray-600">{item.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};