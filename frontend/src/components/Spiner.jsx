import Loading from "../assets/images/spinner.gif";

const Spinner = () => {
  return (
    <div className="w-fit ml-1">
      <img src={Loading} className="m-auto w-[16px]" />
    </div>
  );
};

export default Spinner;
