import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { TemplateSelector } from './components/TemplateSelector';
import { ResumeBuilder } from './components/ResumeBuilder';
import { JobField, TemplateType } from './types';

type View = 'landing' | 'selector' | 'builder';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedField, setSelectedField] = useState<JobField>('Software Developer');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('professional');

  const handleStart = () => setView('selector');
  
  const handleSelectTemplate = (type: TemplateType) => {
    setSelectedTemplate(type);
    setView('builder');
  };

  const handleBackToSelector = () => setView('selector');

  return (
    <div className="antialiased">
      {view === 'landing' && (
        <Landing onStart={handleStart} />
      )}
      
      {view === 'selector' && (
        <TemplateSelector 
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {view === 'builder' && (
        <ResumeBuilder 
          template={selectedTemplate}
          field={selectedField}
          onBack={handleBackToSelector}
        />
      )}
    </div>
  );
}
