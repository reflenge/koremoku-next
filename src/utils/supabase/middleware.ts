import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // createServerClientとsupabase.auth.getUser()の間でコードを実行しないでください。
    // 小さなミスでも、ユーザーがランダムにログアウトされるという問題のデバッグが非常に困難になります。

    // 重要: auth.getUser()を削除しないでください。

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (
        !user &&
        request.nextUrl.pathname !== "/" &&
        !request.nextUrl.pathname.startsWith("/login") &&
        !request.nextUrl.pathname.startsWith("/auth") &&
        !request.nextUrl.pathname.startsWith("/error")
    ) {
        // ユーザーが存在しない場合、ログインページへリダイレクトで応答する可能性があります
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // 重要: 必ずsupabaseResponseオブジェクトをそのまま返してください。
    // 新たにNextResponse.next()でレスポンスを作成する場合は、必ず以下の手順を踏んでください:
    // 1. requestを渡す:  const myNewResponse = NextResponse.next({ request })
    // 2. クッキーをコピーする: myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. レスポンスを調整する場合も、クッキーは変更しないでください！
    // 4. 最後に: return myNewResponse
    // これを守らないと、ブラウザとサーバのセッションが同期せず、ユーザーセッションが早期終了する恐れがあります。

    return supabaseResponse;
}
