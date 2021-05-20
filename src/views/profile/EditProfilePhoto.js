import { useState, useEffect } from 'react';
import { useForm, FormProvider, useWatch, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';

import CustomButton from '../../components/form-controls/CustomButton';
import { startEditUserInfo } from '../../redux/actions/auth';
import BackLink from '../../components/BackLink';
import ProfilePhoto from '../../components/ProfilePhoto';

const fieldNames = {
  photoURL: 'photoURL'
};

const EditProfilePhoto = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const methods = useForm();

  const photoURL = useWatch({
    control: methods.control,
    name: fieldNames.photoURL
  });

  useEffect(() => {
    if (photoURL?.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [photoURL?.length]);

  const reset = () => {
    methods.setValue(fieldNames.photoURL, []);
  };

  const onSubmit = (data) => {
    if (data[fieldNames.photoURL]?.length > 0 && !disabled) {
      dispatch(startEditUserInfo(data, reset));
    }
  };
  return (
    <div
      style={{ maxWidth: 500 }}
      className="mx-auto border fade-anim rounded-3 p-4 shadow-sm bg-white"
    >
      <BackLink to="/perfil">Ir a perfil</BackLink>
      <h4>Foto de perfil</h4>

      <ProfilePhoto
        width={100}
        height={100}
        name={auth.userData.name}
        surname={auth.userData.surname}
        photoURL={auth.photoURL}
        className="mx-auto d-block mb-2"
      />

      <h6 className="text-center">Foto actual</h6>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <div>
            <Controller
              name={fieldNames.photoURL}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <>
                  {error && (
                    <span className="text-danger small">{error.message}</span>
                  )}

                  <ImageUploader
                    {...field}
                    withIcon={false}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    imgExtension={['.jpg', '.gif', '.png', 'jpeg', '.svg']}
                    label="Archivo máximo de 2,5 MB"
                    maxFileSize={2621440}
                    withPreview={field.value?.length > 0}
                    singleImage
                    fileTypeError="Tipo de archivo inválido"
                    buttonText="Seleccionar nueva foto"
                    fileSizeError={'debe ser menor a 2,5MB'}
                  />
                </>
              )}
            />
          </div>

          <CustomButton
            disabled={disabled}
            loading={authUi.loading}
            type="submit"
            className="btn btn-primary text-white w-100"
          >
            Actualizar foto
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProfilePhoto;
