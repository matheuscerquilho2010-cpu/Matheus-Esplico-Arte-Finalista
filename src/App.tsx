/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Store from './components/Store';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-blue/30 selection:text-white flex justify-center w-full">
      
      {/* Mobile Card Container */}
      <div className="w-full max-w-md relative bg-[#0a0a0a] min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:border-x sm:border-white/10 overflow-x-hidden">
        
        {/* Background Effects inside container */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -right-[20%] w-[300px] h-[300px] bg-brand-blue/20 rounded-full blur-[80px]"></div>
          <div className="absolute top-[40%] -left-[20%] w-[250px] h-[250px] bg-brand-green/10 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="relative z-10 pb-10">
          <FloatingElements />
          
          <main>
            <Hero />
            <Services />
            <Portfolio />
            <Store />
            <Testimonials />
            <Stats />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

