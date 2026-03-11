import React from 'react';
import { ResumeData } from '../types';

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="font-serif text-slate-800">
      <header className="border-b-2 border-slate-800 pb-4 mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm mt-2 space-x-2">
          <span>{data.personalInfo.email}</span>
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
        </div>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2">Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-bold">
              <span>{exp.position}</span>
              <span>{exp.duration}</span>
            </div>
            <div className="italic mb-1">{exp.company}</div>
            <p className="text-sm whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between font-bold">
              <span>{edu.school}</span>
              <span>{edu.year}</span>
            </div>
            <div className="text-sm">{edu.degree} {edu.location && `| ${edu.location}`}</div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2">Skills</h2>
        <p className="text-sm">{data.skills.join(', ')}</p>
      </section>

      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2">Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <div className="font-bold">{proj.name}</div>
              <p className="text-sm">{proj.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="font-sans text-slate-700 grid grid-cols-3 gap-8">
      <div className="col-span-1 bg-slate-50 -m-20 p-10 pt-20 h-full min-h-[297mm]">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-xs space-y-2 mb-8">
          <div className="break-all"><strong>Email:</strong><br/>{data.personalInfo.email}</div>
          <div><strong>Phone:</strong><br/>{data.personalInfo.phone}</div>
          <div><strong>LinkedIn:</strong><br/>{data.personalInfo.linkedin}</div>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="bg-white px-2 py-1 rounded text-[10px] border border-slate-200">{s}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4 text-xs">
              <div className="font-bold">{edu.degree}</div>
              <div>{edu.school}</div>
              <div className="text-slate-400">{edu.year}</div>
            </div>
          ))}
        </section>
      </div>

      <div className="col-span-2">
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4 border-b pb-1">Profile</h2>
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4 border-b pb-1">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-900">{exp.position}</h3>
                <span className="text-xs text-slate-400">{exp.duration}</span>
              </div>
              <div className="text-sm text-blue-500 mb-2">{exp.company}</div>
              <p className="text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4 border-b pb-1">Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                <p className="text-sm">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export const DeveloperTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="font-mono text-xs text-slate-800">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.linkedin}</span>
        </div>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-bold border-b border-slate-800 mb-2"># technical_skills</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.skills.map((s, i) => (
              <div key={i}>- {s}</div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold border-b border-slate-800 mb-2"># work_experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-bold">
                <span>{exp.position} @ {exp.company}</span>
                <span>[{exp.duration}]</span>
              </div>
              <p className="mt-1 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold border-b border-slate-800 mb-2"># education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{edu.degree}</span>
                <span>{edu.year}</span>
              </div>
              <div>{edu.school}</div>
            </div>
          ))}
        </section>

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold border-b border-slate-800 mb-2"># side_projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-2">
                <div className="font-bold">{proj.name}</div>
                <p>{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="font-sans text-slate-800">
      <div className="bg-purple-600 -m-20 p-20 mb-10 text-white">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex gap-6 text-sm font-medium opacity-90">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.linkedin}</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <section className="mb-10">
            <h2 className="text-2xl font-black uppercase mb-4 text-purple-600">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-8 relative pl-6 border-l-2 border-purple-100">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-2"></div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <span className="text-sm font-bold text-purple-400">{exp.duration}</span>
                </div>
                <div className="text-lg font-medium text-slate-500 mb-3">{exp.company}</div>
                <p className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-4">
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase mb-4 text-purple-600">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{s}</span>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-black uppercase mb-4 text-purple-600">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <div className="font-bold">{edu.degree}</div>
                <div className="text-sm text-slate-500">{edu.school}</div>
                <div className="text-xs font-bold text-purple-400 mt-1">{edu.year}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};
