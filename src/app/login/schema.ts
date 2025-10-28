import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("有効なメールアドレスを入力してください"),
});

export const otpSchema = z.object({
    email: z.email("有効なメールアドレスを入力してください"),
    code: z
        .string()
        .length(6, "6桁のOTPコードを入力してください")
        .regex(/^\d+$/, "数字のみ入力してください"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
