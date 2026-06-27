import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarCheck, FaMapLocationDot, FaRoute, FaWandMagicSparkles } from "react-icons/fa6";

const features = [
    {
        icon: FaWandMagicSparkles,
        title: "AIで下書き",
        description: "目的地や日数を入れるだけで、移動や滞在時間を考慮した旅程案を作成します。",
    },
    {
        icon: FaRoute,
        title: "行程を整理",
        description: "観光、食事、移動を日別に並べて、無理のないスケジュールに調整できます。",
    },
    {
        icon: FaCalendarCheck,
        title: "マイプラン管理",
        description: "作成した旅行プランを保存して、あとから見直しや編集ができます。",
    },
];

const sampleDays = [
    { day: "Day 1", area: "東京", plan: "到着、ホテルチェックイン、夜景スポット" },
    { day: "Day 2", area: "箱根", plan: "美術館、温泉、湖畔散策" },
    { day: "Day 3", area: "鎌倉", plan: "寺社巡り、海沿いカフェ、帰路" },
];

export default function HomePage() {
    return (
        <div className="relative left-1/2 w-screen -translate-x-1/2 -my-4 overflow-hidden bg-white text-slate-900">
            <section className="relative min-h-[calc(100vh-72px)]">
                <Image
                    src="/hero-travel-planner.png"
                    alt="旅行計画のための地図、スマートフォン、チケットが並ぶテーブル"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/20" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

                <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-12">
                    <div className="max-w-2xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
                            <FaMapLocationDot aria-hidden="true" />
                            AI travel planning
                        </div>
                        <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            旅のアイデアを、
                            <span className="block text-emerald-700">そのまま計画へ。</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
                            行きたい場所、日程、気分を入力すると、AIが旅行プランのたたき台を作成。
                            観光、食事、移動をまとめて整理できます。
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/plan"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                            >
                                プランを探す
                                <FaArrowRight aria-hidden="true" />
                            </Link>
                            <Link
                                href="/user/plan/create"
                                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white/90 px-6 text-sm font-bold text-slate-900 shadow-sm backdrop-blur transition hover:border-emerald-500 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                            >
                                新しいプランを作る
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pb-24">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Planning flow</p>
                    <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                        思いつきから共有できる旅程まで、迷わず進める。
                    </h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                                        <Icon aria-hidden="true" />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-950">{feature.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                            <p className="text-sm font-semibold text-emerald-300">Sample itinerary</p>
                            <h2 className="mt-1 text-xl font-black">週末リトリート</h2>
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-emerald-100">3 days</span>
                    </div>
                    <div className="mt-5 space-y-4">
                        {sampleDays.map((item) => (
                            <div key={item.day} className="grid grid-cols-[68px_1fr] gap-4 rounded-md bg-white/5 p-4">
                                <div>
                                    <p className="text-xs font-bold uppercase text-emerald-300">{item.day}</p>
                                    <p className="mt-1 text-sm font-bold">{item.area}</p>
                                </div>
                                <p className="text-sm leading-6 text-slate-200">{item.plan}</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </section>
        </div>
    );
}
