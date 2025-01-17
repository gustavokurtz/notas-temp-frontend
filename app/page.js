import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
            <h1 className="text-5xl font-bold mb-6 text-purple-300 animate-fadeIn">Notas</h1>
            <p className="mb-8 text-gray-400 text-lg text-center max-w-lg animate-fadeIn">
                Crie notas temporárias e compartilhe de forma segura.
            </p>
            <div className="space-x-4">
                <Link
                    href="/create"
                    className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-3 rounded-lg text-lg transition-all duration-300 shadow-lg animate-pulse"
                >
                    Criar Nota
                </Link>
            </div>
        </div>
    );
}
