export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="text-4xl md:text-6xl font-extrabold text-gray-800">
                    Travel Planner
                </div>
                <p className="text-lg font-bold text-black">
                    AIを活用して、あなたの旅行計画をサポートします。
                </p>
                <div className="space-x-4">
                    <a href="/plan"
                        className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-sky-700 transition">
                        さあ、始めましょう！
                    </a>
                </div>
            </div>
        </main>
    );
}
