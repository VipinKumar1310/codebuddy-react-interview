import PropTypes from "prop-types";

const ThirdStep = ({ countryCode, phoneNumber, acceptTermsAndCondition, updateFields, errors }) => {
  console.log(acceptTermsAndCondition);
  return (
    <div className="flex flex-col gap-2">
      <label>Country Code</label>
      <select
        required
        value={countryCode}
        onChange={(e) => updateFields({ countryCode: e.target.value })}
      >
        <option value="">Select Country Code</option>
        <option value="+91">India (+91)</option>
        <option value="+1">America (+1)</option>
      </select>
      {errors.countryCode && <span className="text-red-500">{errors.countryCode}</span>}
      <label>Phone Number</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => updateFields({ phoneNumber: e.target.value })}
        maxLength={"10"}
      />
      {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
      <label className="checkbox style-c mt-2">
        <input
          type="checkbox"
          checked={acceptTermsAndCondition}
          onChange={(e) => updateFields({ acceptTermsAndCondition: e.target.checked })}
        />
        <div className="checkbox__checkmark"></div>
        <div className="checkbox__body">Accept terms and conditions</div>
      </label>
      {errors.acceptTermsAndCondition && (
        <span className="text-red-500">{errors.acceptTermsAndCondition}</span>
      )}
    </div>
  );
};

ThirdStep.propTypes = {
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  acceptTermsAndCondition: PropTypes.bool.isRequired,
  updateFields: PropTypes.func,
  errors: PropTypes.object,
};

export default ThirdStep;
