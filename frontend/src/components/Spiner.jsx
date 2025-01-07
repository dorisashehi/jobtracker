import Loading from "../assets/images/spinner.gif";

const Spinner = () => {
  return (
    <div className="w-full">
      <img src={Loading} className="m-auto w-[16px]" />
    </div>
  );
};

export default Spinner;
