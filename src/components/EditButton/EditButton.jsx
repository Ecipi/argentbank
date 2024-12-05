const EditButton = ({ onClick, children }) => {
  return (
    <button className="edit-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default EditButton;
