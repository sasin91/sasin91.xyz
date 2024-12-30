import type { PropsWithChildren, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function BlogArticle({
  title,
  date,
  children,
  description,
}: PropsWithChildren<{
  title: ReactNode;
  date: string | Date;
  description: ReactNode;
}>) {
  const dateInstance = new Date(date);

  return (
    <article className="flex max-w-xl flex-col items-start justify-between drop-shadow-xl">
      <Card>
        <CardHeader className="flex items-center gap-x-4">
          <CardTitle>{title}</CardTitle>
          <time dateTime={dateInstance.toISOString()} className="text-gray-500">
            {dateInstance.toLocaleDateString()}
          </time>
        </CardHeader>

        {children}

        <CardContent className="flex items-center gap-x-4 text-xs">
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </article>
  );
}
