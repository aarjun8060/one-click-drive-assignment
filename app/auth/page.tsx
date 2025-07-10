import { LoginForm } from "@/components/auth/login-form";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/mobile-banner2.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
