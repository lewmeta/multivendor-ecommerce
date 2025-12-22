"use client";

import React, { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // This runs ONLY on the client after the first render
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ClerkProvider
            appearance={{
                // While 'mounted' is false, we default to undefined (light).
                // Once 'mounted' is true, we use the actual user/system preference.
                baseTheme: mounted && resolvedTheme === "dark" ? dark : undefined,
            }}
        >
            {children}
        </ClerkProvider>
    );
};

export default AuthProvider;
