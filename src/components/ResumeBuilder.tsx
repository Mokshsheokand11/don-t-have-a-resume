import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ResumeData, TemplateType, JobField } from '../types';
import { 
  User, Mail, Phone, Linkedin, MapPin, 
  Plus, Trash2, Sparkles, ChevronLeft, ChevronRight, 
  Download, Save, GraduationCap, Briefcase, Code, Trophy,
  Palette, Layout, Type, ArrowUp, ArrowDown, Moon, Sun, RotateCcw
} from 'lucide-react';
import { ProfessionalTemplate, ModernTemplate, DeveloperTemplate, CreativeTemplate } from './Templates';
import { improveDescription, generateResumeSummary } from '../services/geminiService';

// @ts-ignore
import html2pdf from 'html2pdf.js';

interface ResumeBuilderProps {
  template: TemplateType;
  field: JobField;
  onBack: () => void;
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    summary: '',
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
  achievements: [],
  theme: {
    primaryColor: '#0f172a',
    fontFamily: 'sans',
    spacing: 'normal',
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects']
  }
};

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ template, field, onBack }) => {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume_data');
    const parsed = saved ? JSON.parse(saved) : initialData;
    // Migration: ensure theme exists
    if (!parsed.theme) {
      parsed.theme = initialData.theme;
    }
    return parsed;
  });
  const [activeSection, setActiveSection] = useState(0);
  const [isImproving, setIsImproving] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('editor_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('editor_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('resume_data', JSON.stringify(data));
  }, [data]);

  const updatePersonalInfo = (key: keyof ResumeData['personalInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [key]: value }
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      setData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (index: number) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const addItem = (key: 'education' | 'experience' | 'projects') => {
    const items = {
      education: { school: '', degree: '', year: '', location: '' },
      experience: { company: '', position: '', duration: '', description: '' },
      projects: { name: '', description: '', link: '' }
    };
    setData(prev => ({ ...prev, [key]: [...prev[key], items[key]] }));
  };

  const updateItem = (key: 'education' | 'experience' | 'projects', index: number, field: string, value: string) => {
    setData(prev => {
      const newList = [...prev[key]];
      newList[index] = { ...newList[index], [field]: value };
      return { ...prev, [key]: newList };
    });
  };

  const removeItem = (key: 'education' | 'experience' | 'projects', index: number) => {
    setData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  const handleImproveDescription = async (index: number) => {
    const currentText = data.experience[index].description;
    if (!currentText) return;
    
    setIsImproving(`exp-${index}`);
    const improved = await improveDescription(currentText, field);
    updateItem('experience', index, 'description', improved);
    setIsImproving(null);
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    const summary = await generateResumeSummary(data);
    updatePersonalInfo('summary', summary);
    setIsGeneratingSummary(false);
  };

  const updateTheme = (key: keyof NonNullable<ResumeData['theme']>, value: any) => {
    setData(prev => ({
      ...prev,
      theme: { ...prev.theme!, [key]: value }
    }));
  };

  const reorderSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...data.theme!.sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    updateTheme('sectionOrder', newOrder);
  };

  const resetTheme = () => {
    updateTheme('primaryColor', initialData.theme!.primaryColor);
    updateTheme('fontFamily', initialData.theme!.fontFamily);
    updateTheme('spacing', initialData.theme!.spacing);
    updateTheme('sectionOrder', initialData.theme!.sectionOrder);
  };

  const downloadPDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 0,
      filename: `${data.personalInfo.fullName || 'Resume'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };
    html2pdf().set(opt).from(element).save();
  };

  const sections = [
    { title: 'Personal', icon: <User className="w-5 h-5" /> },
    { title: 'Design', icon: <Palette className="w-5 h-5" /> },
    { title: 'Skills', icon: <Code className="w-5 h-5" /> },
    { title: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
    { title: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
    { title: 'Projects', icon: <Trophy className="w-5 h-5" /> }
  ];

  const renderTemplate = () => {
    switch (template) {
      case 'professional': return <ProfessionalTemplate data={data} />;
      case 'modern': return <ModernTemplate data={data} />;
      case 'developer': return <DeveloperTemplate data={data} />;
      case 'creative': return <CreativeTemplate data={data} />;
      default: return <ProfessionalTemplate data={data} />;
    }
  };

  // Calculate progress
  const totalFields = 10; // Simplified
  const filledFields = [
    data.personalInfo.fullName,
    data.personalInfo.email,
    data.skills.length > 0,
    data.experience.length > 0,
    data.education.length > 0
  ].filter(Boolean).length;
  const progress = (filledFields / 5) * 100;

  const colors = [
    { name: 'Slate', value: '#0f172a' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Violet', value: '#7c3aed' },
    { name: 'Rose', value: '#e11d48' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Amber', value: '#d97706' },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Left Sidebar - Editor */}
      <div className={`w-full md:w-1/2 h-screen overflow-y-auto p-6 md:p-10 border-r transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="text-right">
              <div className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Progress</div>
              <div className={`w-32 h-1.5 rounded-full overflow-hidden mt-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {sections.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeSection === i 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : isDarkMode 
                  ? 'bg-slate-800 text-slate-500 hover:bg-slate-700' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              {s.icon}
              {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-8"
          >
            {activeSection === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Full Name</label>
                    <input 
                      type="text" 
                      value={data.personalInfo.fullName}
                      onChange={e => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDarkMode ? 'bg-slate-800 placeholder:text-slate-600' : 'bg-slate-50 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Email</label>
                    <input 
                      type="email" 
                      value={data.personalInfo.email}
                      onChange={e => updatePersonalInfo('email', e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDarkMode ? 'bg-slate-800 placeholder:text-slate-600' : 'bg-slate-50 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Phone</label>
                    <input 
                      type="text" 
                      value={data.personalInfo.phone}
                      onChange={e => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 234 567 890"
                      className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDarkMode ? 'bg-slate-800 placeholder:text-slate-600' : 'bg-slate-50 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Location</label>
                    <input 
                      type="text" 
                      value={data.personalInfo.location}
                      onChange={e => updatePersonalInfo('location', e.target.value)}
                      placeholder="New York, NY"
                      className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDarkMode ? 'bg-slate-800 placeholder:text-slate-600' : 'bg-slate-50 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>LinkedIn</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.linkedin}
                    onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                    className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      isDarkMode ? 'bg-slate-800 placeholder:text-slate-600' : 'bg-slate-50 placeholder:text-slate-400'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Professional Summary</label>
                    <button 
                      onClick={handleGenerateSummary}
                      disabled={isGeneratingSummary}
                      className="text-[10px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1 hover:text-blue-700 disabled:opacity-50"
                    >
                      <Sparkles className="w-3 h-3" />
                      {isGeneratingSummary ? 'Generating...' : 'AI Generate'}
                    </button>
                  </div>
                  <textarea 
                    value={data.personalInfo.summary}
                    onChange={e => updatePersonalInfo('summary', e.target.value)}
                    placeholder="Briefly describe your professional background..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                        isDarkMode ? 'bg-slate-800 placeholder:text-slate-600 text-slate-300' : 'bg-slate-50 placeholder:text-slate-400 text-slate-700'
                      }`}
                  />
                </div>
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-10">
                {/* Color Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Primary Color</label>
                    <button onClick={resetTheme} className="text-[10px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => updateTheme('primaryColor', c.value)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          data.theme?.primaryColor === c.value ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                    <div className="relative group">
                      <input 
                        type="color" 
                        value={data.theme?.primaryColor}
                        onChange={e => updateTheme('primaryColor', e.target.value)}
                        className="w-10 h-10 rounded-full border-2 border-transparent bg-slate-200 cursor-pointer overflow-hidden p-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-4">
                  <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Typography</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['sans', 'serif', 'mono'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => updateTheme('fontFamily', f)}
                        className={`py-3 px-4 rounded-xl border-2 transition-all capitalize font-bold ${
                          data.theme?.fontFamily === f 
                          ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' 
                          : isDarkMode ? 'border-slate-800 bg-slate-800 text-slate-400 hover:border-slate-700' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                        }`}
                      >
                        <span className={f === 'serif' ? 'font-serif' : f === 'mono' ? 'font-mono' : 'font-sans'}>
                          {f}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spacing */}
                <div className="space-y-4">
                  <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Spacing & Density</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['compact', 'normal', 'spacious'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => updateTheme('spacing', s)}
                        className={`py-3 px-4 rounded-xl border-2 transition-all capitalize font-bold ${
                          data.theme?.spacing === s 
                          ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm' 
                          : isDarkMode ? 'border-slate-800 bg-slate-800 text-slate-400 hover:border-slate-700' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Order */}
                <div className="space-y-4">
                  <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Section Order</label>
                  <div className="space-y-2">
                    {data.theme?.sectionOrder.map((s, i) => (
                      <div 
                        key={s} 
                        className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Layout className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold capitalize">{s}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => reorderSection(i, 'up')}
                            disabled={i === 0}
                            className="p-1 hover:bg-white rounded transition-colors disabled:opacity-0"
                          >
                            <ArrowUp className="w-4 h-4 text-slate-400 hover:text-blue-500" />
                          </button>
                          <button 
                            onClick={() => reorderSection(i, 'down')}
                            disabled={i === data.theme!.sectionOrder.length - 1}
                            className="p-1 hover:bg-white rounded transition-colors disabled:opacity-0"
                          >
                            <ArrowDown className="w-4 h-4 text-slate-400 hover:text-blue-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Add Skills</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. React, Python, Project Management"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          addSkill(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDarkMode ? 'bg-slate-800 placeholder:text-slate-600' : 'bg-slate-50 placeholder:text-slate-400'
                      }`}
                    />
                    <button className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <span key={i} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 group transition-colors ${
                      isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {skill}
                      <button onClick={() => removeSkill(i)} className="text-slate-400 hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="space-y-8">
                {data.experience.map((exp, i) => (
                  <div key={i} className={`p-6 rounded-2xl space-y-4 relative group transition-colors ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-50'
                  }`}>
                    <button 
                      onClick={() => removeItem('experience', i)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Company</label>
                        <input 
                          type="text" 
                          value={exp.company}
                          onChange={e => updateItem('experience', i, 'company', e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Position</label>
                        <input 
                          type="text" 
                          value={exp.position}
                          onChange={e => updateItem('experience', i, 'position', e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Duration</label>
                      <input 
                        type="text" 
                        value={exp.duration}
                        onChange={e => updateItem('experience', i, 'duration', e.target.value)}
                        placeholder="Jan 2020 - Present"
                        className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Description</label>
                        <button 
                          onClick={() => handleImproveDescription(i)}
                          disabled={isImproving === `exp-${i}`}
                          className="text-[10px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1 hover:text-blue-700 disabled:opacity-50"
                        >
                          <Sparkles className="w-3 h-3" />
                          {isImproving === `exp-${i}` ? 'Improving...' : 'AI Improve'}
                        </button>
                      </div>
                      <textarea 
                        value={exp.description}
                        onChange={e => updateItem('experience', i, 'description', e.target.value)}
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDarkMode ? 'bg-slate-900 text-slate-300 placeholder:text-slate-700' : 'bg-white text-slate-700 placeholder:text-slate-400'
                      }`}
                      />
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('experience')}
                  className={`w-full py-4 border-2 border-dashed rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                    isDarkMode ? 'border-slate-800 text-slate-600 hover:border-blue-500 hover:text-blue-500' : 'border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-500'
                   }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Experience
                </button>
              </div>
            )}

            {activeSection === 4 && (
              <div className="space-y-8">
                {data.education.map((edu, i) => (
                  <div key={i} className={`p-6 rounded-2xl space-y-4 relative group transition-colors ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-50'
                  }`}>
                    <button 
                      onClick={() => removeItem('education', i)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>School / University</label>
                      <input 
                        type="text" 
                        value={edu.school}
                        onChange={e => updateItem('education', i, 'school', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                        }`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Degree</label>
                        <input 
                          type="text" 
                          value={edu.degree}
                          onChange={e => updateItem('education', i, 'degree', e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Year</label>
                        <input 
                          type="text" 
                          value={edu.year}
                          onChange={e => updateItem('education', i, 'year', e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('education')}
                  className={`w-full py-4 border-2 border-dashed rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                    isDarkMode ? 'border-slate-800 text-slate-600 hover:border-blue-500 hover:text-blue-500' : 'border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-500'
                   }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Education
                </button>
              </div>
            )}

            {activeSection === 5 && (
              <div className="space-y-8">
                {data.projects.map((proj, i) => (
                  <div key={i} className={`p-6 rounded-2xl space-y-4 relative group transition-colors ${
                    isDarkMode ? 'bg-slate-800' : 'bg-slate-50'
                  }`}>
                    <button 
                      onClick={() => removeItem('projects', i)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Project Name</label>
                      <input 
                        type="text" 
                        value={proj.name}
                        onChange={e => updateItem('projects', i, 'name', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Description</label>
                      <textarea 
                        value={proj.description}
                        onChange={e => updateItem('projects', i, 'description', e.target.value)}
                        rows={3}
                        className={`w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDarkMode ? 'bg-slate-900 text-slate-300 placeholder:text-slate-700' : 'bg-white text-slate-700 placeholder:text-slate-400'
                      }`}
                      />
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('projects')}
                  className={`w-full py-4 border-2 border-dashed rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                    isDarkMode ? 'border-slate-800 text-slate-600 hover:border-blue-500 hover:text-blue-500' : 'border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-500'
                   }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Project
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex gap-4">
          <button 
            onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
            className={`flex-1 py-4 rounded-2xl font-bold transition-colors ${
              isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Previous
          </button>
          <button 
            onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
            className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            {activeSection === sections.length - 1 ? 'Finish & Review' : 'Next Section'}
          </button>
        </div>
      </div>

      {/* Right Sidebar - Preview */}
      <div className={`w-full md:w-1/2 h-screen overflow-y-auto p-6 md:p-10 flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950' : 'bg-slate-100'
      }`}>
        <div className="flex justify-between items-center mb-6 no-print">
          <h3 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Live Preview</h3>
          <button 
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-xl shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
        
        <div className="flex-1 flex items-start justify-center">
          <div 
            id="resume-preview" 
            className="resume-preview-container shadow-2xl scale-[0.4] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9]"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
