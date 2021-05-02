import clsx from 'clsx';
import { renderInitials } from '../utils/misc';

const ProfilePhoto = ({
  photoURL,
  displayName,
  className,
  width,
  height,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'd-inline-block overflow-hidden border border-2 rounded-circle d-flex align-items-center justify-content-center profile-photo',
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
        <strong>{renderInitials(displayName)}</strong>
      )}
    </div>
  );
};

export default ProfilePhoto;
