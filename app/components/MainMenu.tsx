import Link from 'next/link';

export default function MainMenu() {
    return (
        <header className="bg-green-600 text-white">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link href="/">
                        Travel Planner
                    </Link>
                </h1>
                <nav className="space-x-4">
                    <Link href="/plan" className="hover:text-gray-300">
                        プランを探す
                    </Link>
                    <Link href="/user/plan" className="hover:text-gray-300">
                        マイプラン
                    </Link>
                </nav>
            </div>
        </header>
    );
}
