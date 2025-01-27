import PropTypes from "prop-types";
import Select from "react-select";
import { useState } from "react";
import ApplicationsAPI from "../services/ApplicationsAPI";
import { format } from "date-fns";
import Spinner from "../components/Spiner";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TextareaField from "../components/TextareaField";
import Options from "../data/selectOptions";
import Validation from "../utilities/Validation";
import CheckboxField from "../components/CheckboxField";

const EditApplicationsForm = ({
  closeModal,
  application,
  setApplications,
  crFormData,
  setCrFormData,
}) => {
  const [applicationData, setApplicationData] = useState(application);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleSelectedAction = (el, name) => {
    setApplicationData({ ...applicationData, [name]: el.value });
    const { newErrors } = Validation.validateField(name, el.value);
    setErrors({ ...errors, ...newErrors });
  };

  const [errors, setErrors] = useState({
    company_name: "",
    company_website: "",
    apply_date: "",
    apply_method: "",
    apply_url: "",
    position: "",
    location: "",
  });

  const handleChange = (input) => {
    const { name, value, checked } = input;

    setApplicationData({
      ...applicationData,
      [name]: name !== "favorite" ? value : checked,
    });

    if (
      name == "company_name" ||
      name == "company_website" ||
      name == "apply_date" ||
      name == "apply_method" ||
      name == "apply_url" ||
      name == "position" ||
      name == "location"
    ) {
      const { newErrors } = Validation.validateField(name, value);

      setErrors({ ...errors, ...newErrors });
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    const { valid, newErrors } = Validation.validateAll(applicationData);
    setErrors(newErrors);

    if (valid) {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      };

      try {
        const response = await ApplicationsAPI.updateApplById(
          application.id,
          options
        );
        const data = response;

        if (data.success) {
          console.log(data.success);
          setApplications((prevState) => {
            const prevAppl = [...prevState];
            prevAppl.map((h, index) => {
              if (h.id === application.id) {
                prevAppl[index] = data.success;
              }
            });
            return prevAppl;
          });
          closeModal("view");
        }
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        setApplicationData({
          ...applicationData,
          submissionError: error.message,
        });
      } finally {
        setLoadingUpdate(false);
      }
    } else {
      setLoadingUpdate(false);
    }
  };

  const handleDeleteApplication = async (e) => {
    e.preventDefault();
    setLoadingDelete(true);

    try {
      const response = await ApplicationsAPI.deleteApplById(application.id);
      const data = response;

      if (data.success) {
        setApplications((prevState) => {
          const filteredApplications = prevState.filter(
            (h) => h.id !== application.id
          );
          return filteredApplications;
        });

        closeModal("view");
      }

      if (data.error) {
        setApplicationData({
          ...applicationData,
          submissionError: data.error,
        });
      }
    } catch (error) {
      setApplicationData({
        ...applicationData,
        submissionError: error.message,
      }).finally(() => {
        setLoadingDelete(false);
      });
    }
  };

  return (
    <form className="modal-form flex w-fit flex-col">
      <div className="modal-content">
        <InputField
          label="Company Name"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"company_name"}
          value={applicationData?.company_name || ""}
          inputPlaceholder={"TechCorp Inc."}
        />

        <InputField
          label="Company Website"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"company_website"}
          value={applicationData?.company_website || ""}
          inputPlaceholder={"www.techcorp.com"}
        />

        <CheckboxField
          label="Favorite"
          handleChange={handleChange}
          errors={errors}
          fieldName={"favorite"}
          value={applicationData.favorite}
          className={"mr-[8px]"}
        />

        <InputField
          label="Apply Date"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"apply_date"}
          inputType={"date"}
          value={
            applicationData?.apply_date
              ? format(new Date(applicationData?.apply_date), "yyyy-MM-dd")
              : ""
          }
          inputPlaceholder={"2024-01-15"}
        />

        <SelectField
          label="Apply Method"
          fieldName="apply_method"
          required={true}
          errors={errors}
          options={Options.methodOptions}
          setCrFormData={setCrFormData}
          defaultValue={Options.methodOptions.find(
            (el) => el.value === applicationData.apply_method
          )}
          onChangeAction={(option) =>
            handleSelectedAction(option, "apply_method")
          }
        />

        <InputField
          label="Apply URL"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"apply_url"}
          value={applicationData?.apply_url || ""}
          inputPlaceholder={"www.techcorp.com/careers"}
        />

        <InputField
          label="Position"
          required={true}
          handleChange={handleChange}
          errors={errors}
          fieldName={"position"}
          inputPlaceholder={"Software Engineer"}
          value={applicationData?.position || ""}
        />

        <SelectField
          label="Location"
          fieldName="location"
          required={true}
          errors={errors}
          options={Options.locationOptions}
          setCrFormData={setCrFormData}
          onChangeAction={(option) => handleSelectedAction(option, "location")}
          defaultValue={
            applicationData?.location
              ? Options.locationOptions.find(
                  (el) => el.value === applicationData?.location
                )
              : crFormData.location
          }
        />

        <InputField
          label="Interview Date"
          handleChange={handleChange}
          errors={errors}
          fieldName={"interview_date"}
          inputType={"date"}
          value={
            applicationData?.interview_date
              ? format(new Date(applicationData?.interview_date), "yyyy-MM-dd")
              : ""
          }
        />

        <InputField
          label="Offer Amount"
          handleChange={handleChange}
          errors={errors}
          fieldName={"offer_amount"}
          inputType={"number"}
          inputPlaceholder={"85000"}
          value={applicationData?.offer_amount || ""}
        />

        <SelectField
          label="Rejected"
          fieldName="rejected"
          errors={errors}
          options={Options.rejectedOptions}
          setCrFormData={setCrFormData}
          onChangeAction={(option) => handleSelectedAction(option, "rejected")}
          defaultValue={
            Options.rejectedOptions.find(
              (el) => el.value === applicationData?.rejected
            ) || crFormData.rejected
          }
        />

        <InputField
          label="Contact Name"
          handleChange={handleChange}
          errors={errors}
          fieldName={"contact_name"}
          inputPlaceholder={"John Doe"}
          value={applicationData.contact_name || ""}
        />
        <TextareaField
          label="Notes"
          fieldName="notes"
          onChangeAction={handleChange}
          placeholder="The interview went well, waiting for feedback."
          value={applicationData?.notes || ""}
        />

        <InputField
          label="Contact Email"
          handleChange={handleChange}
          errors={errors}
          fieldName={"contact_email"}
          inputType={"email"}
          inputPlaceholder={"john.doe@example.com"}
          value={applicationData?.contact_email || ""}
        />

        <InputField
          label="Company Phone"
          handleChange={handleChange}
          errors={errors}
          fieldName={"contact_phone"}
          inputPlaceholder={"(555) 123-4567"}
          value={applicationData?.contact_phone || ""}
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <Link
          className="flex flex-row gap-1 text-[#ef4444] underline text-[13px] font-bold items-center"
          onClick={(e) => handleDeleteApplication(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-style-small"
            viewBox="0 -960 960 960"
            fill="#ef4444"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
          Delete
        </Link>
        <Button
          title="Update"
          onClickAct={(e) => handleSubmitApplication(e)}
          className="float-right mt-0 self-en"
        >
          {loadingUpdate && <Spinner style="w-fit ml-1" />}
        </Button>
      </div>

      {applicationData.submissionError && (
        <em className="err-message">{applicationData.submissionError}</em>
      )}
    </form>
  );
};

EditApplicationsForm.propTypes = {
  application: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  setApplications: PropTypes.func.isRequired,
  crFormData: PropTypes.object,
  setCrFormData: PropTypes.func,
};
export default EditApplicationsForm;
