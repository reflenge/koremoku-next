"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { loginSchema, otpSchema } from "./schema";

export type OtpSendState =
    | { success: true; message: string; email: string }
    | { success: false; message: string }
    | null;

export type OtpVerifyState =
    | { success: true; message: string }
    | { success: false; message: string }
    | null;

// OTPコードをメール送信
export async function sendOtp(
    prevState: OtpSendState,
    formData: FormData
): Promise<OtpSendState> {
    const supabase = await createClient();

    // zodでバリデーション
    const result = loginSchema.safeParse({
        email: formData.get("email"),
    });

    if (!result.success) {
        return {
            success: false,
            message:
                result.error.issues[0]?.message ||
                "バリデーションエラーが発生しました",
        };
    }

    // OTPコードをメール送信
    const { data, error } = await supabase.auth.signInWithOtp({
        email: result.data.email,
        options: {
            // ユーザーを自動的にサインアップ
            shouldCreateUser: true,
        },
    });

    if (error) {
        return {
            success: false,
            message: error.message || "メール送信に失敗しました",
        };
    }

    // 成功した場合、メール送信完了のメッセージを返す
    return {
        success: true,
        message: `${result.data.email}にOTPコードを送信しました。メールをご確認ください。`,
        email: result.data.email,
    };
}

// OTPコードを検証してログイン
export async function verifyOtp(
    prevState: OtpVerifyState,
    formData: FormData
): Promise<OtpVerifyState> {
    const supabase = await createClient();

    // zodでバリデーション
    const result = otpSchema.safeParse({
        email: formData.get("email"),
        code: formData.get("code"),
    });

    if (!result.success) {
        return {
            success: false,
            message:
                result.error.issues[0]?.message ||
                "バリデーションエラーが発生しました",
        };
    }

    // OTPコードを検証
    const { data, error } = await supabase.auth.verifyOtp({
        email: result.data.email,
        token: result.data.code,
        type: "email",
    });

    if (error) {
        return {
            success: false,
            message: error.message || "認証に失敗しました",
        };
    }

    // 認証成功
    revalidatePath("/", "layout");
    redirect("/estimate");
}
