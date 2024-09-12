const UserInfoTab = ({ user }) => {
  return (
    <div className="space-y-2">
      <h1>
        <span className="font-bold">Name:</span> {user.name}
      </h1>
      <h1>
        <span className="font-bold">Email:</span> {user.email}
      </h1>
    </div>
  );
};

export default UserInfoTab;
