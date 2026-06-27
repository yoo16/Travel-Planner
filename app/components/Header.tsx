import Link from 'next/link';

export default function MainMenu() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 text-slate-900 backdrop-blur">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <h1 className="text-lg font-black tracking-tight">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500" aria-hidden="true" />
                        Travel Planner
                    </Link>
                </h1>
                <nav className="flex items-center gap-2 text-sm font-bold">
                    <Link href="/plan" className="rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700">
                        プランを探す
                    </Link>
                    <Link href="/user/plan" className="rounded-md bg-emerald-600 px-3 py-2 text-white transition hover:bg-emerald-700">
                        マイプラン
                    </Link>
                </nav>
            </div>
        </header>
    );
}
