import PropTypes from "prop-types";

function ValidationError({ children }) {
  return <div className="form__error">{children}</div>;
}

ValidationError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ValidationError;
