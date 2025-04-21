import { RegisterFormValues } from "@/lib/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation/authSchema";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface RegisterProps {
  onSubmit: (data: RegisterFormValues) => void;
}

export default function Register({ onSubmit }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <>
      <h2 className="text-2xl font-bold">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Name" className="input" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" className="input" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className="input"
        />
        <p className="text-red-500 text-sm">
          {errors.confirmPassword?.message}
        </p>

        <select {...register("role")} className="input">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <p className="text-red-500 text-sm">{errors.role?.message}</p>

        <button type="submit" className="btn w-full cursor-pointer">
          Register
        </button>
      </form>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </>
  );
}
