"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    loginSchema,
    otpSchema,
    type LoginFormData,
    type OtpFormData,
} from "./schema";
import { sendOtp, verifyOtp } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [otpSent, setOtpSent] = useState(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [serverState, setServerState] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    // URLパラメータからエラーを読み取る
    useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            setServerState({
                success: false,
                message: decodeURIComponent(error),
            });
        }
    }, [searchParams]);

    const emailForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        },
    });

    const otpForm = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            email: "",
            code: "",
        },
    });

    const onSendOtp = async (data: LoginFormData) => {
        setServerState(null);
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", data.email);

            const result = await sendOtp(null, formData);
            if (result) {
                setServerState({
                    success: result.success,
                    message: result.message,
                });
                if (result.success && result.email) {
                    setOtpSent(true);
                    setUserEmail(result.email);
                    otpForm.setValue("email", result.email);
                }
            }
        });
    };

    const onVerifyOtp = async (data: OtpFormData) => {
        setServerState(null);
        startTransition(async () => {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("code", data.code);

            await verifyOtp(null, formData);
        });
    };

    const handleBack = () => {
        setOtpSent(false);
        setServerState(null);
        otpForm.reset();
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>ログイン</CardTitle>
                    <CardDescription>
                        {otpSent
                            ? "メールに送信された6桁のコードを入力してください"
                            : "メールアドレスを入力してOTPコードを受け取ります"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!otpSent ? (
                        <Form {...emailForm}>
                            <form
                                onSubmit={emailForm.handleSubmit(onSendOtp)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={emailForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                メールアドレス
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="example@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {serverState && (
                                    <div
                                        className={`p-3 rounded-md text-sm ${
                                            serverState.success
                                                ? "bg-green-50 text-green-800 border border-green-200"
                                                : "bg-red-50 text-red-800 border border-red-200"
                                        }`}
                                    >
                                        {serverState.message}
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full"
                                >
                                    {isPending
                                        ? "送信中..."
                                        : "OTPコードを送信"}
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Form {...otpForm}>
                            <form
                                onSubmit={otpForm.handleSubmit(onVerifyOtp)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={otpForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                メールアドレス
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    disabled
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={otpForm.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>OTPコード</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="123456"
                                                    maxLength={6}
                                                    className="text-center text-2xl tracking-widest"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                ""
                                                            );
                                                        field.onChange(value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {serverState && (
                                    <div
                                        className={`p-3 rounded-md text-sm ${
                                            serverState.success
                                                ? "bg-green-50 text-green-800 border border-green-200"
                                                : "bg-red-50 text-red-800 border border-red-200"
                                        }`}
                                    >
                                        {serverState.message}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full"
                                    >
                                        {isPending ? "確認中..." : "ログイン"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleBack}
                                        className="w-full"
                                    >
                                        戻る
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
