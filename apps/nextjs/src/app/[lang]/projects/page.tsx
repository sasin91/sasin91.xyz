import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon } from "lucide-react";
import { Lng } from "~/app/i18n/settings";
import AppFooter from "~/components/app-footer";
import AppHeader from "~/components/app-header";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import Grid from "~/components/ui/grid";
import { Separator } from "~/components/ui/separator";

function DemoGithub() {
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>shadcn/ui</CardTitle>
                    <CardDescription>
                        Beautifully designed components built with Radix UI and Tailwind
                        CSS.
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                    <Button variant="secondary" className="px-3 shadow-none">
                        <StarIcon className="mr-2 h-4 w-4" />
                        Star
                    </Button>
                    <Separator orientation="vertical" className="h-[20px]" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="px-2 shadow-none">
                                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            alignOffset={-5}
                            className="w-[200px]"
                            forceMount
                        >
                            <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Future Ideas
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <PlusIcon className="mr-2 h-4 w-4" /> Create List
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        TypeScript
                    </div>
                    <div className="flex items-center">
                        <StarIcon className="mr-1 h-3 w-3" />
                        20k
                    </div>
                    <div>Updated April 2023</div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ProjectsPage({ params }: { params: { lang: Lng } }) {
    return (
        <>
            <AppHeader lang={params.lang} />

            <div className="relative overflow-hidden isolate -z-10 bg-gradient-to-b from-indigo-100/20 via-violet-100/40 to-cyan-100/20 pt-14">
                <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-cyan-500/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                    aria-hidden="true" />
                <div className="px-6 py-32 mx-auto max-w-7xl sm:py-40 lg:px-8">
                    <Grid>
                        <DemoGithub />
                        <DemoGithub />
                        <DemoGithub />
                        <DemoGithub />
                    </Grid>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-white sm:h-32" />
            </div>

            <AppFooter />
        </>
    );
}