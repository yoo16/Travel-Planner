import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-white px-8 py-7 shadow-sm">
                <FaSpinner className="animate-spin text-emerald-600" size={36} />
                <p className="mt-4 text-sm font-bold text-slate-600">Loading...</p>
            </div>
        </div>
    );
}
