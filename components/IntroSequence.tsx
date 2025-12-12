'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation'; // 1. Import Router

export default function IntroSequence({ onComplete }: { onComplete?: () => void }) {
    const [step, setStep] = useState(0);
    const router = useRouter(); // 2. Initialize Router

    useEffect(() => {
        // The "Movie Script" Timeline
        const timers = [
            setTimeout(() => setStep(1), 2500),  // Fact 1
            setTimeout(() => setStep(2), 7500),  // Fact 2
            setTimeout(() => setStep(3), 13000), // The Reveal
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const handleEnter = () => {
        // Optional: Call onComplete if you want to save state that "Intro is seen"
        if (onComplete) onComplete();
        // 3. Navigate to Join Page
        router.push('/join');
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
        >

            {/* 1. The Heartbeat (Refined Size) */}
            <div className="mb-12 relative">
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-red-600 blur-[50px] rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "anticipate" }}
                >
                    <Heart
                        size={48}

                        fill="#DC2626"
                        className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                    />
                </motion.div>
            </div>

            {/* 2. The Text Experience */}
            <div className="min-h-40 w-full max-w-2xl flex flex-col items-center justify-center text-center">
                <AnimatePresence mode='wait'>

                    {/* SCENE 1: THE PROBLEM */}
                    {step === 1 && (
                        <motion.div
                            key="fact1"
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h2 className="text-2xl md:text-4xl font-medium text-white mb-4 leading-snug tracking-tight">
                                Blood in a fridge expires in <br />
                                <span className="text-red-500 font-bold">42 days</span>.
                            </h2>
                            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-80">
                                Then it is thrown away
                            </p>
                        </motion.div>
                    )}

                    {/* SCENE 2: THE SOLUTION */}
                    {step === 2 && (
                        <motion.div
                            key="fact2"
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h2 className="text-2xl md:text-4xl font-medium text-white mb-4 leading-snug tracking-tight">
                                Blood in <span className="text-white border-b border-red-600 pb-0.5">us</span> lasts a <br />
                                <span className="text-green-500 font-bold">Lifetime</span>.
                            </h2>
                            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-80">
                                Don't store it. Share it live.
                            </p>
                        </motion.div>
                    )}

                    {/* SCENE 3: THE CALL TO ACTION */}
                    {step === 3 && (
                        <motion.div
                            key="reveal"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-red-500 to-red-900 uppercase tracking-tighter mb-6 drop-shadow-2xl">
                                PULSE
                            </h1>

                            <p className="text-gray-400 mb-10 text-lg md:text-xl font-light tracking-wide">
                                7,000 of us. One heartbeat.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(220,38,38,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleEnter} // 4. Connects to the handler
                                className="group px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full flex items-center gap-3 transition-all"
                            >
                                Join Pulse <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                            </motion.button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </motion.div>
    );
}