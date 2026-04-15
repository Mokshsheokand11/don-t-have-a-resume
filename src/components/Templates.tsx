import React from 'react';
import { ResumeData, SectionType } from '../types';

const getTheme = (data: ResumeData) => ({
  primaryColor: data.theme?.primaryColor || '#0f172a',
  fontFamily: data.theme?.fontFamily || 'sans',
  spacing: data.theme?.spacing || 'normal',
  sectionOrder: data.theme?.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects'] as SectionType[]
});

const getSpacingClass = (spacing: string) => {
  switch (spacing) {
    case 'compact': return 'mb-3';
    case 'spacious': return 'mb-10';
    default: return 'mb-6';
  }
};

const getFontClass = (font: string) => {
  switch (font) {
    case 'serif': return 'font-serif';
    case 'mono': return 'font-mono';
    default: return 'font-sans';
  }
};

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const theme = getTheme(data);
  const spacingClass = getSpacingClass(theme.spacing);

  const sections: Record<SectionType, React.ReactNode> = {
    summary: data.personalInfo.summary ? (
      <section className={spacingClass}>
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Professional Summary</h2>
        <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
      </section>
    ) : null,
    experience: data.experience.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Experience</h2>
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
    ) : null,
    education: data.education.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Education</h2>
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
    ) : null,
    skills: data.skills.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Skills</h2>
        <p className="text-sm">{data.skills.join(', ')}</p>
      </section>
    ) : null,
    projects: data.projects.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-2">
            <div className="font-bold">{proj.name}</div>
            <p className="text-sm">{proj.description}</p>
          </div>
        ))}
      </section>
    ) : null
  };

  return (
    <div className={`${getFontClass(theme.fontFamily)} text-slate-800`}>
      <header className="border-b-2 pb-4 mb-6 text-center" style={{ borderColor: theme.primaryColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm mt-2 space-x-2">
          <span>{data.personalInfo.email}</span>
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
        </div>
      </header>

      {theme.sectionOrder.map(id => (
        <React.Fragment key={id}>{sections[id]}</React.Fragment>
      ))}
    </div>
  );
};

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const theme = getTheme(data);
  const spacingClass = getSpacingClass(theme.spacing);

  return (
    <div className={`${getFontClass(theme.fontFamily)} text-slate-700 grid grid-cols-3 gap-8`}>
      <div className="col-span-1 bg-slate-50 -m-20 p-10 pt-20 h-full min-h-[297mm]">
        <h1 className="text-2xl font-bold mb-2" style={{ color: theme.primaryColor }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-xs space-y-2 mb-8">
          <div className="break-all"><strong>Email:</strong><br/>{data.personalInfo.email}</div>
          <div><strong>Phone:</strong><br/>{data.personalInfo.phone}</div>
          <div><strong>LinkedIn:</strong><br/>{data.personalInfo.linkedin}</div>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="bg-white px-2 py-1 rounded text-[10px] border border-slate-200" style={{ borderColor: theme.primaryColor + '20' }}>{s}</span>
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
        {theme.sectionOrder.map(id => {
          if (id === 'summary' && data.personalInfo.summary) {
            return (
              <section key={id} className={spacingClass}>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Profile</h2>
                <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
              </section>
            );
          }
          if (id === 'experience' && data.experience.length > 0) {
            return (
              <section key={id} className={spacingClass}>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Experience</h2>
                {data.experience.map((exp, i) => (
                  <div key={i} className="mb-6">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-xs text-slate-400">{exp.duration}</span>
                    </div>
                    <div className="text-sm mb-2 font-medium" style={{ color: theme.primaryColor }}>{exp.company}</div>
                    <p className="text-sm whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </section>
            );
          }
          if (id === 'projects' && data.projects.length > 0) {
            return (
              <section key={id} className={spacingClass}>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}>Projects</h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-bold text-slate-900 text-sm">{proj.name}</h3>
                    <p className="text-sm">{proj.description}</p>
                  </div>
                ))}
              </section>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const DeveloperTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const theme = getTheme(data);
  const spacingClass = getSpacingClass(theme.spacing);

  const sections: Record<SectionType, React.ReactNode> = {
    summary: data.personalInfo.summary ? (
      <section className={spacingClass}>
        <h2 className="text-sm font-bold border-b mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}># profile</h2>
        <p className="leading-relaxed">{data.personalInfo.summary}</p>
      </section>
    ) : null,
    skills: data.skills.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-sm font-bold border-b mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}># technical_skills</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.skills.map((s, i) => (
            <div key={i}>- {s}</div>
          ))}
        </div>
      </section>
    ) : null,
    experience: data.experience.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-sm font-bold border-b mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}># work_experience</h2>
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
    ) : null,
    education: data.education.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-sm font-bold border-b mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}># education</h2>
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
    ) : null,
    projects: data.projects.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-sm font-bold border-b mb-2" style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}># side_projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-2">
            <div className="font-bold">{proj.name}</div>
            <p>{proj.description}</p>
          </div>
        ))}
      </section>
    ) : null
  };

  return (
    <div className={`${getFontClass(theme.fontFamily)} text-xs text-slate-800`}>
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: theme.primaryColor }}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.linkedin}</span>
        </div>
      </header>

      <div className="space-y-4">
        {theme.sectionOrder.map(id => (
          <React.Fragment key={id}>{sections[id]}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const theme = getTheme(data);
  const spacingClass = getSpacingClass(theme.spacing);

  const sections: Record<SectionType, React.ReactNode> = {
    summary: data.personalInfo.summary ? (
      <section className={spacingClass}>
        <h2 className="text-2xl font-black uppercase mb-4" style={{ color: theme.primaryColor }}>Profile</h2>
        <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
      </section>
    ) : null,
    experience: data.experience.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-2xl font-black uppercase mb-4" style={{ color: theme.primaryColor }}>Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-8 relative pl-6 border-l-2" style={{ borderColor: theme.primaryColor + '20' }}>
            <div className="absolute w-3 h-3 rounded-full -left-[7px] top-2" style={{ backgroundColor: theme.primaryColor }}></div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-bold">{exp.position}</h3>
              <span className="text-sm font-bold" style={{ color: theme.primaryColor }}>{exp.duration}</span>
            </div>
            <div className="text-lg font-medium text-slate-500 mb-3">{exp.company}</div>
            <p className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </section>
    ) : null,
    skills: data.skills.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-xl font-black uppercase mb-4" style={{ color: theme.primaryColor }}>Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <span key={i} className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{s}</span>
          ))}
        </div>
      </section>
    ) : null,
    education: data.education.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-xl font-black uppercase mb-4" style={{ color: theme.primaryColor }}>Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-4">
            <div className="font-bold">{edu.degree}</div>
            <div className="text-sm text-slate-500">{edu.school}</div>
            <div className="text-xs font-bold mt-1" style={{ color: theme.primaryColor }}>{edu.year}</div>
          </div>
        ))}
      </section>
    ) : null,
    projects: data.projects.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-xl font-black uppercase mb-4" style={{ color: theme.primaryColor }}>Projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-4">
            <div className="font-bold">{proj.name}</div>
            <p className="text-sm text-slate-500">{proj.description}</p>
          </div>
        ))}
      </section>
    ) : null
  };

  return (
    <div className={`${getFontClass(theme.fontFamily)} text-slate-800`}>
      <div className="-m-20 p-20 mb-10 text-white" style={{ backgroundColor: theme.primaryColor }}>
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
          {theme.sectionOrder.map(id => (id === 'experience' || id === 'summary') && (
            <React.Fragment key={id}>{sections[id]}</React.Fragment>
          ))}
        </div>

        <div className="col-span-4">
          {theme.sectionOrder.map(id => (id !== 'experience' && id !== 'summary') && (
            <React.Fragment key={id}>{sections[id]}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ElegantTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const theme = getTheme(data);
  const spacingClass = getSpacingClass(theme.spacing);

  const sections: Record<SectionType, React.ReactNode> = {
    summary: data.personalInfo.summary ? (
      <section className={spacingClass}>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center" style={{ color: theme.primaryColor }}>About Me</h2>
        <p className="text-sm leading-relaxed text-center italic max-w-2xl mx-auto">{data.personalInfo.summary}</p>
      </section>
    ) : null,
    experience: data.experience.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 border-b pb-2 flex items-center gap-4">
          <span className="flex-1 h-[1px] bg-slate-200"></span>
          Experience
          <span className="flex-1 h-[1px] bg-slate-200"></span>
        </h2>
        <div className="space-y-8">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-serif italic text-slate-900">{exp.position}</h3>
                <span className="text-xs uppercase tracking-widest text-slate-400">{exp.duration}</span>
              </div>
              <div className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: theme.primaryColor }}>{exp.company}</div>
              <p className="text-sm leading-relaxed text-slate-600 font-serif">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,
    education: data.education.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-baseline">
              <div className="font-serif italic text-lg">{edu.degree}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">{edu.year}</div>
            </div>
            <div className="text-sm font-bold uppercase tracking-wider opacity-60">{edu.school}</div>
          </div>
        ))}
      </section>
    ) : null,
    skills: data.skills.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2">Expertise</h2>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {data.skills.map((s, i) => (
            <span key={i} className="text-sm font-serif italic">{s}</span>
          ))}
        </div>
      </section>
    ) : null,
    projects: data.projects.length > 0 ? (
      <section className={spacingClass}>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2">Notable Projects</h2>
        <div className="grid grid-cols-2 gap-6">
          {data.projects.map((proj, i) => (
            <div key={i}>
              <div className="font-serif italic text-slate-900 border-l-2 pl-3 mb-1" style={{ borderColor: theme.primaryColor }}>{proj.name}</div>
              <p className="text-xs text-slate-500 leading-relaxed font-serif">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null
  };

  return (
    <div className={`p-10 ${getFontClass('serif')} text-slate-800 min-h-[297mm]`}>
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-serif italic mb-4 tracking-tight" style={{ color: theme.primaryColor }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto">
        {theme.sectionOrder.map(id => (
          <React.Fragment key={id}>{sections[id]}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const MinimalistTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const theme = getTheme(data);
  const spacingClass = getSpacingClass(theme.spacing);

  return (
    <div className={`p-16 ${getFontClass('sans')} text-slate-700 bg-white min-h-[297mm]`}>
      <header className="mb-16">
        <h1 className="text-3xl font-light tracking-tight mb-2 text-slate-900">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm opacity-50 font-medium">
          {data.personalInfo.email} &bull; {data.personalInfo.phone} &bull; {data.personalInfo.location}
        </p>
      </header>

      <div className="space-y-12">
        {theme.sectionOrder.map(id => {
          if (id === 'summary' && data.personalInfo.summary) {
            return (
              <section key={id}>
                <p className="text-sm leading-relaxed max-w-xl">{data.personalInfo.summary}</p>
              </section>
            );
          }
          if (id === 'experience' && data.experience.length > 0) {
            return (
              <section key={id}>
                <div className="space-y-8">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="flex gap-8">
                      <div className="w-32 flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-400 pt-1">
                        {exp.duration}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                        <div className="text-sm opacity-60 mb-2">{exp.company}</div>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          if (id === 'skills' && data.skills.length > 0) {
            return (
              <section key={id} className="flex gap-8 border-t border-slate-50 pt-8">
                <div className="w-32 flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Skills
                </div>
                <div className="flex-1 text-sm flex flex-wrap gap-x-6 gap-y-2">
                  {data.skills.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </section>
            );
          }
          if (id === 'education' && data.education.length > 0) {
            return (
              <section key={id} className="flex gap-8 border-t border-slate-50 pt-8">
                <div className="w-32 flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Education
                </div>
                <div className="flex-1 space-y-4">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <div className="text-sm font-bold">{edu.degree}</div>
                      <div className="text-sm opacity-60">{edu.school}, {edu.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const theme = getTheme(data);
  const spacingClass = getSpacingClass(theme.spacing);

  const sections: Record<SectionType, React.ReactNode> = {
    summary: data.personalInfo.summary ? (
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-1">Objective</h2>
        <p className="text-[13px] leading-tight">{data.personalInfo.summary}</p>
      </section>
    ) : null,
    experience: data.experience.length > 0 ? (
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Professional Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-bold text-[13px]">
              <span>{exp.company}</span>
              <span>{exp.duration}</span>
            </div>
            <div className="flex justify-between italic text-[13px] mb-1">
              <span>{exp.position}</span>
            </div>
            <p className="text-[13px] leading-tight whitespace-pre-line pl-2 border-l border-slate-200 ml-1">{exp.description}</p>
          </div>
        ))}
      </section>
    ) : null,
    education: data.education.length > 0 ? (
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between font-bold text-[13px]">
              <span>{edu.school}</span>
              <span>{edu.year}</span>
            </div>
            <div className="text-[13px]">{edu.degree} | {edu.location}</div>
          </div>
        ))}
      </section>
    ) : null,
    skills: data.skills.length > 0 ? (
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-1">Skills</h2>
        <p className="text-[13px]"><strong>Technical:</strong> {data.skills.join(', ')}</p>
      </section>
    ) : null,
    projects: data.projects.length > 0 ? (
      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-2 text-[13px]">
            <span className="font-bold">{proj.name}</span> &mdash; {proj.description}
          </div>
        ))}
      </section>
    ) : null
  };

  return (
    <div className={`p-12 ${getFontClass('serif')} text-black min-h-[297mm] leading-normal`}>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold uppercase mb-1">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-[13px] space-x-1">
          <span>{data.personalInfo.location}</span>
          <span>|</span>
          <span>{data.personalInfo.phone}</span>
          <span>|</span>
          <span>{data.personalInfo.email}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>|</span>
              <span>{data.personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </header>

      {theme.sectionOrder.map(id => (
        <React.Fragment key={id}>{sections[id]}</React.Fragment>
      ))}
    </div>
  );
};
