/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn, tokenManager } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";

async function loginUser(data: { email: string; password: string }) {
    return await apiPost("/auth/login", data);
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUser,
        onSuccess: (data: any) => {
            console.log("Login successful:", data);
            tokenManager.setToken(data.token); // Store the token
            toast.success("Login successful!");
            navigate("/dashboard"); // Redirect on success
        },
        onError: (error) => {
            toast.error(error.message);
            console.error("Signup error:", error);
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null); // Reset error before new request

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        localStorage.setItem("email", email);

        mutation.mutate({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" id="email" type="email" placeholder="m@gmail.com" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Input name="password" id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" isLoading={mutation.isPending}>
                    Login
                </Button>
            </div>
            {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    );
}
