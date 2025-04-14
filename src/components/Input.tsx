import styles from "./Card.module.css";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

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
      <fieldset
        style={{ position: "relative" }}
        className="d-flex align-items-center"
      >
        <input
          id="inputCity"
          placeholder="Enter city name"
          type="text"
          className={styles.inputField}
          {...register("city", { required: true, minLength: 3 })}
        />

        <button
          type="submit"
          className="btn  btn-lg"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <IoSearch size={25} color="blue" className={styles.searchIcon} />
        </button>
      </fieldset>
      <div>
        {errors.city?.type === "required" && (
          <p className="text-danger">city name required.</p>
        )}
        {errors.city?.type === "minLength" && (
          <p className="text-danger">Must be at least 3 characters.</p>
        )}
      </div>
      <button
        onClick={() => reset}
        type="reset"
        className="btn btn-danger mt-3 mx-2 btn-lg"
      >
        Clear
      </button>
    </form>
  );
};

export default Input;
