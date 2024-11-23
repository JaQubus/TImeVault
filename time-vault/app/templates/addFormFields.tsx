import { useForm, SubmitHandler } from "react-hook-form";
import { CustomFormField } from "../types";
import { useUserDataContext } from "../userContextProvider";
import OLF from "../OneLastFetch";
import ApiLinks from "../apiLinks";
import FormErrorWrap from "./formErrorWrap";
import FormErrorParahraph from "./formErrorParagraph";

const AddNewFormFields = () => {
  type FormProps = CustomFormField;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const { setCustomFormFields } = useUserDataContext();

    const customField: CustomFormField = {
      title: data.title,
      due: data.due,
      caption: data.caption,
      image: data.image,
    };

    setCustomFormFields((prev) => [...(prev || []), customField]);

    try {
      const response = await OLF.post(ApiLinks.addFormFields, data);
      console.log("Form submitted successfully", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormErrorWrap>
        <input
          id="title"
          {...register("title", {
            required: {
              value: true,
              message: "Title is required",
            },
            validate: (title) => {
              if (!title || title.length <= 3)
                return "title must be at least 4 char long";
              return true;
            },
          })}
          type="text"
          placeholder="Title"
          name="target"
        />
        <FormErrorParahraph errorObject={errors.title}></FormErrorParahraph>
      </FormErrorWrap>
      <FormErrorWrap>
        <input
          id="due"
          type="date"
          {...register("due", {
            required: {
              value: true,
              message: "Due Date is required",
            },
            validate: (due) => {
              if (!due) return "Due date must be set";
              const selectedDate = new Date(due);
              const today = new Date();
              if (isNaN(selectedDate.getTime())) {
                return "Please enter a valid date.";
              }
              if (selectedDate < today) {
                return "Due date cannot be in the past.";
              }
              return true;
            },
          })}
          placeholder="Due Date"
          name="due"
        />
        <FormErrorParahraph errorObject={errors.due}></FormErrorParahraph>
      </FormErrorWrap>
      <FormErrorWrap>
        <input
          id="caption"
          {...register("caption", {
            validate: (title) => {
              if (!title || title.length <= 3)
                return "Caption must be at least 4 char long";
              return true;
            },
          })}
          type="text"
          placeholder="Caption"
          name="caption"
        />
        <FormErrorParahraph errorObject={errors.caption}></FormErrorParahraph>
      </FormErrorWrap>
    </form>
  );
};
