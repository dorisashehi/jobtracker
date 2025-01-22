import PropTypes from "prop-types";

const Card = ({ title, total, desc, children }) => {
  return (
    <div className="card">
      <div className="card-head">
        <h5 className="card-header">{title}</h5>
        {children}
      </div>
      <div>
        <p className="card-content">{total}</p>
        <p className="card-desc">{desc}</p>
      </div>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  children: PropTypes.node,
};
export default Card;
