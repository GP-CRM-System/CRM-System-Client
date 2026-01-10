import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { crmHome, customerFrame } from "../../assets";
import { play_blue, maki_arrow_ri, left_blur, right_blur } from "../../assets/icons/landingPage";

export default function LandingPageHero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div
            id="home"
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] pb-8 relative max-w-[1440px] mx-auto overflow-visible"
        >
            {/* Blur Images */}
            <motion.img 
                src={left_blur} 
                alt="" 
                className="absolute left-0 top-[10%] w-40 sm:w-48 md:w-56 lg:w-72 xl:w-96 -z-10 opacity-50 pointer-events-none"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.img 
                src={right_blur} 
                alt="" 
                className="absolute right-0 top-[5%] w-40 sm:w-48 md:w-56 lg:w-72 xl:w-96 -z-10 opacity-50 pointer-events-none"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
            
            <motion.div 
                className="flex flex-col relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="flex justify-center" variants={itemVariants}>
                    <img
                        src={customerFrame}
                        alt="frame"
                        className="w-[150px] sm:w-[200px] md:w-[250px]"
                    />
                </motion.div>
                <motion.p 
                    className="text-[var(--color-text-body)] flex justify-center p-1 sm:p-2 mt-1 text-[12px] sm:text-[14px] md:text-[16px]"
                    variants={itemVariants}
                >
                    Trusted by 100+ Customers
                </motion.p>
            </motion.div>
            
            <motion.div 
                className="flex flex-col mt-6 sm:mt-8 max-w-[90%] sm:max-w-[600px] md:max-w-[744px] mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] text-center leading-tight text-[var(--color-text-title)]"
                    variants={itemVariants}
                >
                    Manage your Entire Business From One{" "}
                    <span className="text-[#4A90E2]">Nexify</span>
                </motion.h1>

                <motion.p 
                    className="font-medium text-[var(--color-text-body)] text-base sm:text-lg md:text-xl lg:text-[24px] text-center mt-3 sm:mt-4 max-w-[700px] mx-auto"
                    variants={itemVariants}
                >
                    A Smart CRM System that unifies sales, accounting, and HR Dashboards
                </motion.p>
            </motion.div>
            
            <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mt-6 sm:mt-8 items-stretch sm:items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
            >
                <Link
                    to="/login"
                    className="min-w-[160px] sm:min-w-[200px] lg:min-w-[221px] bg-[#4A90E2] font-medium text-base sm:text-lg lg:text-[20px] text-center text-white py-3 px-6 rounded-lg border border-transparent hover:scale-105 hover:shadow-xl hover:bg-[#3a7bc8] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                    Start Free Trial
                    <img src={maki_arrow_ri} alt="arrow right" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <button className="min-w-[160px] sm:min-w-[200px] lg:min-w-[221px] bg-white font-medium text-base sm:text-lg lg:text-[20px] text-[#4A90E2] py-3 px-6 rounded-lg border border-[#4A90E2] hover:scale-105 hover:shadow-xl hover:bg-[#4A90E2] hover:text-white active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <img src={play_blue} alt="play" className="w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all duration-300"/>
                    Watch Demo
                </button>
            </motion.div>
            
            <motion.div 
                className="mt-8 sm:mt-12 md:mt-16 flex justify-center mb-2"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
            >
                <img
                    src={crmHome}
                    alt="home image"
                    className="w-full max-w-[90%] sm:max-w-full h-auto"
                />
            </motion.div>
        </div>
    );
}