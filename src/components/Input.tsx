import styles from "./Card.module.css";
import { useForm } from "react-hook-form";

interface InputData {
  city: string;
}

interface Props {
  handleSubmission: (data: InputData) => void;
}

const Input = ({ handleSubmission }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InputData>();

  const onCheck = (data: InputData) => {
    handleSubmission(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onCheck)} className={styles.inputContainer}>
      <input
        placeholder="Enter city name"
        type="text"
        className={styles.inputField}
        {...register("city", { required: true, minLength: 3 })}
      />
      {errors.city?.type === "required" && (
        <p className="text-danger">city name required.</p>
      )}
      {errors.city?.type === "minLength" && (
        <p className="text-danger">Must be at least 3 characters.</p>
      )}
      <button type="submit" className="btn btn-outline-primary mt-2 btn-lg">
        Search
      </button>
    </form>
  );
};

export default Input;
