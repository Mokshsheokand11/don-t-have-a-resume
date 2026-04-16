import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Layout, Sparkles, Download } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6">
              Don't Have a <span className="text-blue-600">Resume?</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create a professional, ATS-friendly resume in minutes using AI.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="bg-slate-900 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl shadow-blue-200 hover:bg-blue-600 transition-colors"
            >
              Create My Resume
            </motion.button>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { icon: <Layout className="w-8 h-8 text-blue-600" />, title: "Choose a template", desc: "Select from our curated list of professional designs." },
              { icon: <Sparkles className="w-8 h-8 text-purple-600" />, title: "Answer AI questions", desc: "Our AI helps you craft the perfect descriptions." },
              { icon: <Download className="w-8 h-8 text-emerald-600" />, title: "Download PDF", desc: "Get your resume ready for applications instantly." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Professional Templates</h2>
              <p className="text-slate-500">Designed to pass ATS and impress recruiters.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Professional', 'Modern', 'Developer', 'Creative'].map((name, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-slate-100 rounded-2xl mb-4 overflow-hidden border border-slate-200 transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="w-full h-full bg-white p-4">
                    <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
                    <div className="w-2/3 h-2 bg-slate-50 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-full h-1 bg-slate-50 rounded"></div>
                      <div className="w-full h-1 bg-slate-50 rounded"></div>
                      <div className="w-4/5 h-1 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-slate-900">{name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-black tracking-tighter">
            DON'T HAVE A <span className="text-blue-600">RESUME?</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-900">Templates</a>
            <a href="#" className="hover:text-slate-900">AI Builder</a>
            <a href="#" className="hover:text-slate-900">Privacy</a>
          </div>
          <div className="text-sm text-slate-400">
            © 2026 Don't Have a Resume. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
