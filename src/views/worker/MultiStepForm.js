import { useState } from 'react';
import PersonalDataStep from './PersonalDataStep';
import PhotoStep from './PhotoStep';
import ServicesDataStep from './ServicesDataStep';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDataStep
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <ServicesDataStep
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <PhotoStep
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            updateFormData={updateFormData}
          />
        );
      default:
        return (
          <PersonalDataStep
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            updateFormData={updateFormData}
          />
        );
    }
  };

  const updateFormData = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <div>
      <div
        className="container"
        style={{ paddingTop: '1rem', paddingBottom: 100 }}
      >
        <div className="mx-auto" style={{ maxWidth: 400 }}>
          <div className="alert alert-primary" role="alert">
            Para ser un worker debes completar tu perfil
          </div>
          <div className="border rounded-3 p-4 shadow-sm bg-white">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
