import { useForm } from "react-hook-form";
import { useRequest } from "../../hooks/use-request";

interface UserFormData {
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();
  const { doRequest, errors: requestErrors } = useRequest({
    url: "/api/users/register",
    method: "post",
  });

  const onSubmit = async (data: UserFormData) => {
    doRequest({ email: data.email, password: data.password });
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mt-2 mb-2">
        <label htmlFor="exampleInputEmail1">Email address</label>

        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          {...register("email", { required: true })}
        />

        {errors.email && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      <div className="form-group mt-2 mb-2">
        <label htmlFor="exampleInputPassword1">Password</label>

        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        {errors.password && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {requestErrors}

      <button type="submit" className="btn btn-primary mt-1">
        Submit
      </button>
    </form>
  );
};

export default Register;
