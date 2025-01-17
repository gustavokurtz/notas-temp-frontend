"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "tailwindcss/tailwind.css";

export default function CreateNote() {
    const [content, setContent] = useState("");
    const [duration, setDuration] = useState("");
    const [noteId, setNoteId] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/create", {
                content,
                durationInMinutes: duration,
            });
            setNoteId(res.data.link.split("/").pop());
        } catch (error) {
            console.error("Erro ao criar nota:", error);
        }
    };

    const handleCopy = () => {
        if (!noteId) return;
        const fullLink = `${window.location.origin}/view/${noteId}`;
        navigator.clipboard.writeText(fullLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-6">
            <div className="bg-purple-900 p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">Criar Nota</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Escreva sua nota"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg border border-purple-400 focus:ring-2 focus:ring-purple-500"
                    />
                    <Input
                        type="number"
                        placeholder="Duração (em minutos)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg border border-purple-400 focus:ring-2 focus:ring-purple-500"
                    />
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-800 transition-all duration-300 p-3 rounded-lg w-full">
                        Criar Nota
                    </Button>
                </form>

                {noteId && (
                    <div className="mt-4 p-4 bg-yellow-500 text-black font-semibold rounded-md text-center animate-fadeIn">
                        ⚠️ Atenção: As notas só podem ser visualizadas uma vez!
                    </div>
                )}

                {/* Exibir link e botão de copiar com animação */}
                {noteId && (
                    <div className="mt-4 flex items-center space-x-3 p-3 rounded-md border border-purple-400 animate-fadeIn bg-purple-700 shadow-md">
                        <a
                            href={`/view/${noteId}`}
                            className="flex-1 text-white text-center bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-2 rounded-md shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
                        >
                            🔗 Veja a nota!
                        </a>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-md shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
                        >
                            📋 {copied ? "Copiado!" : "Copiar"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
