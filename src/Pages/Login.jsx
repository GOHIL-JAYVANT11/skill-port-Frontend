import { useState, useEffect, useRef } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import img from '../assets/Images/hr-employee-connection.png';
import logo from '../assets/Images/SkillPORT_logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';




const Login = () => {
    const [step, setStep] = useState("credentials");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [showPassword, setShowPassword] = useState(false); ``
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_URL;



    const containerRef = useRef(null);
    const resumeRef = useRef(null);
    const handshakeRef = useRef(null);

    const formRef = useRef(null);
    const otpRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.3 }
            );

            gsap.to(resumeRef.current, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });

            gsap.to(handshakeRef.current, {
                scale: 1.05,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }
    }, [step]);

    const handleCredentialsSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/gknbvg/SkillPort-admin/ertqyuiok/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login success:', data);
                setStep("otp");
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred during login.');
        }
    };





    const handleOtpChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];

            // If user pastes whole OTP (191695)
            if (value.length === 6) {
                value.split("").forEach((d, i) => newOtp[i] = d);
                setOtp(newOtp);
                otpRefs.current[5]?.focus();
                return;
            }

            newOtp[index] = value.slice(-1);
            setOtp(newOtp);

            if (value && index < 5) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };


    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            toast.error("Please enter full 6 digit OTP");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/gknbvg/SkillPort-admin/ertqyuiok/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    otp: finalOtp
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("OTP Verified Success", data);
                navigate("/dashboard");
            } else {
                toast.error("Invalid OTP, please try again");
            }

        } catch (err) {
            console.error("OTP verify error:", err);
            toast.error("Error verifying OTP");
        }
    };



    const handleBackToCredentials = () => {
        gsap.to(formRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            onComplete: () => setStep("credentials"),
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100 relative overflow-hidden">
            <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
                <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-28 items-center">
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-md">
                            <div className="mt-[-90px] pl-12 text-center">
                                <img src={logo} className='w-[300px] h-[200px] ' alt="" />
                            </div>

                            <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8">
                                {step === "credentials" ? (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                                Welcome Back
                                            </h2>
                                            <p className="text-slate-500 text-sm">
                                                Enter your credentials to access your account
                                            </p>
                                        </div>

                                        <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="you@company.com"
                                                        className="w-full pl-12 pr-4 py-3  text-black border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Password
                                                </label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="w-full pl-12 pr-12 py-3 border-2 text-slate-900 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-amber-600/30"
                                            >
                                                Continue
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                                Verify Identity
                                            </h2>
                                            <p className="text-slate-500 text-sm">
                                                Enter the verification code sent to your email
                                            </p>
                                        </div>

                                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-4">
                                                    Verification Code
                                                </label>

                                                <div className="flex gap-3 justify-center">
                                                    {otp.map((digit, index) => (
                                                        <input
                                                            key={index}
                                                            ref={(el) => (otpRefs.current[index] = el)}
                                                            type="text"
                                                            maxLength={1}
                                                            value={digit}
                                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                            onPaste={(e) => handleOtpChange(index, e.clipboardData.getData("text"))}
                                                            className="w-12 h-14 text-center text-xl font-semibold border-2 border-slate-200  text-amber-400 rounded-xl focus:border-amber-500"
                                                        />

                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-center text-sm text-slate-500">
                                                Didn&apos;t receive the code?
                                            </p>

                                            <button
                                                type="submit"
                                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-amber-600/30"
                                            >
                                                Verify & Sign In
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleBackToCredentials}
                                                className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
                                            >
                                                ← Back to credentials
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-center lg:justify-start">
                        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
                            <div className="relative w-[500px] h-[500px]">
                                <img
                                    ref={resumeRef}
                                    src={img}
                                    alt="resume"
                                    className="w-full h-full object-cover rounded-2xl shadow-xl"
                                />

                                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-6 py-3 text-sm font-semibold text-slate-700 border-2 border-amber-200">
                                    <div className="flex items-center gap-2">
                                        <div className="text-2xl">💼</div>
                                        Team Networks
                                    </div>
                                </div>

                                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-6 py-3 text-sm font-semibold text-slate-700 border-2 border-amber-200">
                                    <div className="flex items-center gap-2">
                                        <div className="text-2xl">🎯</div>
                                        Prepare & Succeed
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
