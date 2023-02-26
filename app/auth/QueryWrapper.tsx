'use client'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import {ReactNode} from "react";

const queryClient = new QueryClient()

type Props = {
    children?: ReactNode
}

const QueryWrapper = ({children} :Props)=>(
    <QueryClientProvider client={queryClient}>
        <Toaster/>
        {children}
    </QueryClientProvider>
)

export default QueryWrapper