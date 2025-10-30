import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

import logo from "../../../src/assets/images/logo.png"
import { useSelector } from 'react-redux';

export default function AuthLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const params = useParams()
    const { user } = useSelector((state) => state.auth); 

    useEffect(() => {
        setIsLoaded(true);
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    useEffect(() => {
      if (user) navigate("/");
    }, []);
 

    return ( 
        <div className="min-h-screen bg-black relative overflow-hidden font-sans">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black" />
                
                {/* Floating Particles */}
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${15 + Math.random() * 20}s`,
                            opacity: Math.random() * 0.3 + 0.1
                        }}
                    />
                ))}
                
                {/* Animated Grid */}
                <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                    }}
                />
            </div>

            {/* Mouse Follow Glow */}
            <div 
                className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl transition-all duration-100 ease-out"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
            />

            {/* Main Content */}
            {params.token ? <Outlet/> :
            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                <div className={`w-full max-w-md transition-all duration-1000 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    
                    {/* Glass Card */}

                    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                        
                        {/* Premium Header */}
                        <div className="p-8 pb-6">
                            {/* Animated Logo */}
                            <div className="flex justify-center mb-6">
                                <img src={logo} alt={logo.src} className=' w-20   ' />
                            </div>

                            <div className="text-center mb-2">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    QuantumTask
                                </h1>
                                <p className="text-white/60 text-sm mt-2">
                                    Quantum Secure {location.pathname.split("/")[2]} System
                                </p>
                            </div>

                            {/* Premium Navigation */}
                            <div className="flex bg-white/5 rounded-2xl p-1.5 mt-6 border border-white/5">
                                <button
                                    onClick={() => navigate("/auth/login")}
                                    className={` cursor-pointer flex-1 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-500  ${
                                        location.pathname.includes("login") 
                                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white    '
                                            : 'text-white/70 hover:text-white '
                                    }`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate("/auth/registration")}
                                    className={` cursor-pointer flex-1 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-500 ${
                                        location.pathname.includes("registration") 
                                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white   '
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    Register
                                </button>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 pt-4">
                            <Outlet />
                        </div>

                        {/* Premium Footer */}
                        <div className="px-8 py-6 bg-white/5 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                                    </div>
                                    <span className="text-xs text-white/60">Secure Connection</span>
                                </div>
                                <div className="text-xs text-white/40">
                                    v4.2.1
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Badges */}
                    <div className="mt-6 flex justify-center space-x-6 text-xs">
                        <div className="flex items-center space-x-2 text-white/50">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{animationDuration: '2s'}} />
                            <span>AES-256</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/50">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{animationDuration: '3s'}} />
                            <span>Zero Trust</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/50">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{animationDuration: '4s'}} />
                            <span>GDPR</span>
                        </div>
                    </div>
                </div>
            </div>
             }

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400/20 rounded-full animate-float-slow" />
            <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-purple-400/20 rounded-full animate-float-delayed" />
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-float" />

 
        </div>
    );
}