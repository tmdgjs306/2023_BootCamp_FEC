import React from 'react'

const Questions = () => {
    return (
        <div
            className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900"
        >
            <details className="group p-6 [&_summary::-webkit-details-marker]:hidden" open>
                <summary
                    className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 dark:text-white"
                >
                    <h2 className="text-lg font-medium">
                        Question 1?
                    </h2>

                    <span className="relative h-5 w-5 shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-200">
                    Answer 1
                </p>
            </details>

            <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary
                    className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 dark:text-white"
                >
                    <h2 className="text-lg font-medium">
                        Question 2?
                    </h2>

                    <span className="relative h-5 w-5 shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-200">
                    Answer 2: ...
                </p>
            </details>
        </div>
    )
}

export default Questions