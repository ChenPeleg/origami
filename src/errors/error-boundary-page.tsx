import { Link } from 'react-router';
import { useTranslate } from '../hooks/useTranslate.tsx';

export function ErrorBoundaryPage() {
    const { t } = useTranslate();
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <main
                role="alert"
                aria-live="assertive"
                className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg"
            >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg
                        aria-hidden="true"
                        className="h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                    {t('error')}
                </h2>

                <p className="mt-3 text-base text-slate-500">
                    t{'an error has occurred'}
                </p>

                <div className="mt-8">
                    <Link
                        onClick={() => {
                            location.reload();
                        }}
                        to="/"
                        className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        {t('back to home screen')}
                    </Link>
                </div>
            </main>
        </div>
    );
}
