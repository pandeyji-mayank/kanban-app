import propTypes from 'prop-types';

import './UserAvatar.css';

function UserIcon({ user }) {
  return (
    <div className="user-avatar-container">
      {user?.avatar ? (
        <img src={user.avatar} alt={user?.name} className="user-avatar" />
      ) : (
        <div className="user-avatar-placeholder">
          {user?.name?.[0]?.toUpperCase()}
        </div>
      )}
      <div className="user-name-tooltip">{user?.name}</div>
    </div>
  );
}

UserIcon.propTypes = {
  user: propTypes.object.isRequired
};

export default UserIcon;