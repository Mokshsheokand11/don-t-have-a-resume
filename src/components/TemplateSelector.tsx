import React from 'react';
import { motion } from 'motion/react';
import { JobField, TemplateType } from '../types';
import { ChevronRight, Briefcase } from 'lucide-react';

interface TemplateSelectorProps {
  selectedField: JobField;
  setSelectedField: (field: JobField) => void;
  onSelectTemplate: (type: TemplateType) => void;
}

const fields: JobField[] = [
  'Software Developer',
  'Data Analyst',
  'Marketing',
  'Graphic Designer',
  'Finance',
  'HR',
  'Student / Fresher'
];

const templates: { id: TemplateType; name: string; desc: string; color: string }[] = [
  { id: 'professional', name: 'Professional', desc: 'Classic, clean, and reliable.', color: 'bg-slate-800' },
  { id: 'modern', name: 'Modern', desc: 'Sleek two-column layout.', color: 'bg-blue-600' },
  { id: 'developer', name: 'Developer', desc: 'Monospaced, tech-focused.', color: 'bg-emerald-600' },
  { id: 'creative', name: 'Creative', desc: 'Bold, vibrant, and unique.', color: 'bg-purple-600' }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedField, 
  setSelectedField, 
  onSelectTemplate 
}) => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose your path</h2>
          <p className="text-slate-500">Select your field and a template that fits your style.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Job Field</label>
            <div className="space-y-2">
              {fields.map(field => (
                <button
                  key={field}
                  onClick={() => setSelectedField(field)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                    selectedField === field 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4" />
                    {field}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedField === field ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Select Template</label>
            <div className="grid sm:grid-cols-2 gap-6">
              {templates.map(template => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group"
                >
                  <div className="aspect-[4/3] bg-slate-50 p-8 flex items-center justify-center relative overflow-hidden">
                    {/* Mock Template Preview */}
                    <div className="w-full h-full bg-white shadow-2xl rounded-lg p-4 transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                      <div className={`w-12 h-2 ${template.color} rounded mb-2`}></div>
                      <div className="w-full h-1 bg-slate-100 rounded mb-1"></div>
                      <div className="w-full h-1 bg-slate-100 rounded mb-1"></div>
                      <div className="w-2/3 h-1 bg-slate-100 rounded mb-4"></div>
                      <div className="space-y-2">
                        <div className="w-full h-0.5 bg-slate-50 rounded"></div>
                        <div className="w-full h-0.5 bg-slate-50 rounded"></div>
                        <div className="w-full h-0.5 bg-slate-50 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{template.name}</h3>
                    <p className="text-slate-500 text-sm mb-6">{template.desc}</p>
                    <button
                      onClick={() => onSelectTemplate(template.id)}
                      className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                    >
                      Use Template
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
