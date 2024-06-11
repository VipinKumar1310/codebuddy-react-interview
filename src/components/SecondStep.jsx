import PropTypes from "prop-types";

const SecondStep = ({ firstName, lastName, address, updateFields, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>First Name</label>
      <input
        required
        type="text"
        onChange={(e) => updateFields({ firstName: e.target.value })}
        value={firstName}
      />
      {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
      <label>Last Name</label>
      <input
        type="text"
        onChange={(e) => updateFields({ lastName: e.target.value })}
        value={lastName}
      />
      {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
      <label>Address</label>
      <input
        required
        type="text"
        onChange={(e) => updateFields({ address: e.target.value })}
        value={address}
      />
      {errors.address && <span className="text-red-500">{errors.address}</span>}
    </div>
  );
};

SecondStep.propTypes = {
  updateFields: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  address: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

export default SecondStep;
