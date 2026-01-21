"use client";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { type ComponentProps, type CSSProperties, useEffect, useMemo, useState } from "react";
import { codeToHtml } from "shiki";

import { useViewTransition } from "@/hooks/use-view-transition";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & (
    | { code: string; tabs?: never }
    | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
  );

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  className = "",
  viewTransitionName,
  ...rest
}: ComponentProps<"div"> & CodeBlockProps & { viewTransitionName: string }) => {
  const dark = useDarkMode();
  const withTransition = useViewTransition();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [highlightedHtml, setHighlightedHtml] = useState<string[]>([]);

  const tabsExist = tabs.length > 0;
  const codeTabs = useMemo(() => {
    return tabsExist ? tabs : [{ name: filename, code: code!, language, highlightLines }];
  }, [tabsExist, tabs, filename, code, language, highlightLines]);

  useEffect(() => {
    Promise.all(
      codeTabs.map((tab) =>
        codeToHtml(tab.code, {
          lang: tab.language || language,
          theme: dark ? "github-dark" : "github-light",
          transformers: [
            {
              line(node, line) {
                if ((tab.highlightLines || highlightLines).includes(line)) {
                  this.addClassToHast(node, "highlighted-line");
                }
              },
            },
          ],
        }).catch(() => `<pre><code>${tab.code}</code></pre>`)
      )
    ).then(setHighlightedHtml);
  }, [codeTabs, language, dark, highlightLines]);

  return (
    <div className={cn("relative w-full rounded-lg bg-background text-foreground p-4 font-mono text-sm", className)} {...rest}>
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => withTransition(() => setActiveTab(index))}
                className={`px-3 !py-2 text-xs transition-colors font-sans ${activeTab === index ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex items-center justify-between py-2">
            <div className="text-xs text-zinc-400">{filename}</div>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(codeTabs[activeTab].code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-1 text-xs text-zinc-400 transition-colors font-sans hover:text-zinc-200"
            >
              {copied ? <CopyCheckIcon size={14} /> : <CopyIcon size={14} />}
            </button>
          </div>
        )}
      </div>

      {highlightedHtml.map((html, index) => (
        <div
          key={index}
          className={cn("shiki-wrapper", index !== activeTab && "hidden")}
          style={{ viewTransitionName } as CSSProperties}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}

      <style>{`
        .shiki-wrapper {
          overflow-x: auto;
          max-width: 100%;
          text-align: left;
        }
        .highlighted-line {
          background-color: rgba(255, 255, 255, 0.1);
          display: block;
          width: 100%;
        }
        .shiki {
          margin: 0;
          padding: 0;
          background: transparent !important;
          font-size: 0.875rem;
          text-align: left;
        }
        .shiki code {
          display: block;
          width: fit-content;
          min-width: 100%;
          text-align: left;
        }
        .shiki pre {
          margin: 0;
          padding: 0;
          overflow-x: auto;
          text-align: left;
        }
      `}</style>
    </div>
  );
};
