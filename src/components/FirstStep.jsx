import PropTypes from "prop-types";

const FirstStep = ({ emailId, password, updateFields, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>Email</label>
      <input
        autoFocus
        required
        type="text"
        value={emailId}
        onChange={(e) => updateFields({ emailId: e.target.value })}
      />
      {errors.emailId && <span className="text-red-500">{errors.emailId}</span>}
      <div className="flex flex-col">
        <label>Password</label>
        <input
          required
          type={"password"}
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
        />
      </div>
      {errors.password && <span className="text-red-500">{errors.password}</span>}
    </div>
  );
};

FirstStep.propTypes = {
  updateFields: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FirstStep;
