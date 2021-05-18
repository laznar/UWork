import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import { ChevronLeftIcon } from '@heroicons/react/outline';

import CustomButton from '../../components/form-controls/CustomButton';
import { startUpdateUserData } from '../../redux/actions/auth';

const fieldNames = {
  photoURL: 'photoURL'
};

const schema = yup.object().shape({
  [fieldNames.photoURL]: yup
    .array()
    .test({
      message: 'Debes seleccionar una foto de perfil',
      test: (arr) => arr?.length >= 1
    })
    .required('campo requerido')
});

const PhotoStep = ({ setStep, setFormData, formData, updateFormData }) => {
  const auth = useSelector((state) => state.auth);

  const methods = useForm({
    resolver: auth.photoURL ? undefined : yupResolver(schema),
    defaultValues: {
      [fieldNames.photoURL]: formData[fieldNames.photoURL]
    }
  });

  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);

  const onSubmit = (data) => {
    if (!authUi.loading) {
      dispatch(startUpdateUserData({ ...formData, ...data }, false, true));
      setFormData({ ...formData, ...data });
    }
  };

  return (
    <div className="fade-anim">
      <span
        onClick={() => setStep((step) => step - 1)}
        className="link-primary cursor-pointer d-flex align-items-center mb-1"
      >
        <ChevronLeftIcon width={20} height={20} />
        Atrás
      </span>
      <h4 className="mb-0">Foto de Perfil</h4>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <div>
            <Controller
              name={fieldNames.photoURL}
              control={methods.control}
              render={({
                field: { onChange, value },
                formState: { errors }
              }) => (
                <>
                  {errors[fieldNames.photoURL] && (
                    <span className="text-danger small">
                      {errors[fieldNames.photoURL].message}
                    </span>
                  )}

                  <ImageUploader
                    withIcon={false}
                    onChange={(value) => {
                      onChange(value);
                      updateFormData(fieldNames.photoURL, value);
                    }}
                    imgExtension={['.jpg', '.gif', '.png', 'jpeg', '.svg']}
                    label="Archivo máximo de 2,5 MB"
                    maxFileSize={2621440}
                    withPreview={true}
                    singleImage={true}
                    fileTypeError="Tipo de archivo inválido"
                    buttonText="Seleccionar foto"
                    fileSizeError={'debe ser menor a 2,5MB'}
                    fileContainerStyle={{
                      padding: 0,
                      margin: 0,
                      boxShadow: 'none'
                    }}
                    buttonStyles={{ backgroundColor: '#45a8d8' }}
                  />
                </>
              )}
            />
          </div>

          <CustomButton
            className="btn btn-primary text-white w-100"
            type="submit"
            loading={authUi.loading}
          >
            Guardar información
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default PhotoStep;
