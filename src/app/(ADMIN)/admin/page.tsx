import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/actions/signout";

const Page = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    return (
        <div>
            <h1>Admin Page</h1>
            <p>Hello {data.user.email}</p>
            <form action={signOut}>
                <button type="submit">Sign out</button>
            </form>
        </div>
    );
};

export default Page;
