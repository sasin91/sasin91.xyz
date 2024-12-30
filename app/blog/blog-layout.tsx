import { Outlet } from "react-router";
import { AppNavbar, AppSidebar } from "~/components/app-navigation";
import { StackedLayout } from "~/components/ui/stacked-layout";

export default function BlogLayout() {
    return (
        <StackedLayout sidebar={<AppSidebar />} navbar={<AppNavbar />}>
            <Outlet />
        </StackedLayout>
    )
}