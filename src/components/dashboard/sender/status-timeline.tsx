import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusTimeline({
  steps,
  currentIndex,
  failed = false,
  orientation = "horizontal",
}: {
  steps: readonly string[];
  currentIndex: number;
  failed?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <ol
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-start" : "flex-col gap-4"
      )}
    >
      {steps.map((step, index) => {
        const isComplete = index < currentIndex || (index === currentIndex && !failed);
        const isCurrent = index === currentIndex;
        const isFailed = isCurrent && failed;

        return (
          <li
            key={step}
            className={cn(
              "flex",
              orientation === "horizontal"
                ? "flex-1 flex-col items-center text-center"
                : "flex-row items-center gap-3"
            )}
          >
            <div
              className={cn(
                "flex items-center",
                orientation === "horizontal" && "w-full"
              )}
            >
              {orientation === "horizontal" && index > 0 && (
                <span
                  className={cn(
                    "h-0.5 flex-1",
                    isComplete || isCurrent ? "bg-primary" : "bg-border"
                  )}
                />
              )}
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  isFailed
                    ? "border-destructive bg-destructive/15 text-destructive"
                    : isComplete
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                )}
              >
                {isFailed ? (
                  <X size={14} aria-hidden="true" />
                ) : isComplete ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              {orientation === "horizontal" && index < steps.length - 1 && (
                <span
                  className={cn(
                    "h-0.5 flex-1",
                    index < currentIndex ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-xs",
                orientation === "horizontal" ? "mt-1.5" : "",
                isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
