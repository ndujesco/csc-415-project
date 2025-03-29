/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn, tokenManager } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiPost } from "@/lib/api";
import { toast } from "sonner";

async function signUpUser(data: { email: string; password: string }) {
    return await apiPost("/auth/signup", data);
}

export function SignUp({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
        mutationKey: ["signup"],
        mutationFn: signUpUser,
        onSuccess: (data: any) => {
            console.log("Signup successful:", data);
            tokenManager.setToken(data.token); // Store the token
            toast.success("Signup successful!");
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
        const confirmPassword = formData.get("confirm_password") as string;

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        mutation.mutate({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Sign up to get access</h1>
                <p className="text-balance text-sm text-muted-foreground">Sign up with your company email</p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" id="email" type="email" placeholder="j@gmail.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input name="confirm_password" id="confirm_password" type="password" required />
                </div>
                <Button type="submit" className="w-full" isLoading={mutation.isPending}>
                    Sign Up
                </Button>
            </div>
            {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </form>
    );
}
