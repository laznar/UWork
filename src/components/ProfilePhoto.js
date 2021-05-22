import clsx from 'clsx';
import { renderInitials } from '../utils/misc';

const ProfilePhoto = ({
  photoURL,
  name,
  surname,
  className,
  width,
  height,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'd-inline-block overflow-hidden rounded-circle shadow-sm',
        !photoURL && 'border',
        className
      )}
      style={{ width: width, height: height }}
      {...rest}
    >
      {photoURL ? (
        <img
          className="object-position-center object-fit-cover w-100 h-100"
          src={photoURL}
          alt="Profile pic"
        />
      ) : (
        <div className="d-flex align-items-center justify-content-center profile-photo h-100">
          <strong>
            {renderInitials(name)}
            {renderInitials(surname)}
          </strong>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
