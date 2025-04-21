import { loginSchema } from "@/lib/validation/authSchema";
import { LoginFormValues } from "@/lib/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface LoginProps {
  onSubmit: (data: LoginFormValues) => void;
}

export default function Login({ onSubmit }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="input" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button type="submit" className="btn w-full cursor-pointer">
          Login
        </button>
      </form>

      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </>
  );
}
