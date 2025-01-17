"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import "tailwindcss/tailwind.css";

export default function ViewNote() {
    const { id } = useParams();
    const [noteContent, setNoteContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/view/${id}`);
                setNoteContent(res.data.content);
            } catch (error) {
                console.error("Erro ao carregar a nota:", error);
                setNoteContent("Erro ao carregar a nota.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchNote();
    }, [id]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
            <div className="bg-purple-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center animate-fadeIn">
                <h1 className="text-2xl font-bold mb-4 text-purple-300">Sua Nota</h1>
                {loading ? (
                    <p className="text-gray-400">Carregando...</p>
                ) : (
                    <p className="text-gray-200 p-4 border border-purple-400 rounded-md bg-purple-800">
                        {noteContent}
                    </p>
                )}
            </div>
        </div>
    );
}
