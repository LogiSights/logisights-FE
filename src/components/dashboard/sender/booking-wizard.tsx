"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bookingSchema,
  estimateCost,
  KENYAN_CITIES,
  type BookingValues,
} from "@/lib/sender/schemas";
import { cn } from "@/lib/utils";

const STEPS = ["Parcel details", "Recipient", "Review & pay"] as const;
const PARCEL_SIZES = ["Small (Box)", "Medium (Box)", "Large (Box)"];
const PARCEL_TYPES = ["Standard", "Express", "Fragile"];

const STEP_FIELDS: Record<number, (keyof BookingValues)[]> = {
  0: ["weight", "dimensions", "type"],
  1: ["recipientName", "recipientPhone", "address", "city"],
  2: [],
};

export function BookingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      weight: 1,
      dimensions: "Small (Box)",
      type: "Standard",
      recipientName: "",
      recipientPhone: "",
      address: "",
      city: "Nairobi",
      pickupPoint: "",
    },
  });

  const weight = watch("weight") || 0;
  const cost = estimateCost(Number(weight) || 0);

  async function handleNext() {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function handleBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const trackingId = `KE-00${Math.floor(Math.random() * 900 + 100)}`;
    toast.success(`Parcel booked successfully! ID: ${trackingId}`);
    router.push("/sender");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-xl font-semibold">Book a parcel</h1>

      <ol className="flex items-center gap-2">
        {STEPS.map((label, index) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                index < step
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === step
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
              )}
            >
              {index < step ? <CheckCircle2 size={14} aria-hidden="true" /> : index + 1}
            </span>
            <span
              className={cn(
                "hidden text-xs sm:inline",
                index === step ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
            {index < STEPS.length - 1 && (
              <span className={cn("h-0.5 flex-1", index < step ? "bg-primary" : "bg-border")} />
            )}
          </li>
        ))}
      </ol>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-card p-4 sm:p-6"
      >
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0.1"
                {...register("weight", { valueAsNumber: true })}
              />
              {errors.weight && (
                <p className="text-xs text-destructive">{errors.weight.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Package size</Label>
              <Controller
                control={control}
                name="dimensions"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {PARCEL_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Parcel type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PARCEL_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="recipientName">Recipient name</Label>
              <Input id="recipientName" {...register("recipientName")} />
              {errors.recipientName && (
                <p className="text-xs text-destructive">{errors.recipientName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="recipientPhone">Recipient phone</Label>
              <Input id="recipientPhone" type="tel" {...register("recipientPhone")} />
              {errors.recipientPhone && (
                <p className="text-xs text-destructive">{errors.recipientPhone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address">Delivery address</Label>
              <Input id="address" {...register("address")} />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>City</Label>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {KENYAN_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pickupPoint">Pickup point (optional)</Label>
              <Input id="pickupPoint" {...register("pickupPoint")} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-[var(--radius-element)] bg-muted p-3">
              <span className="text-sm text-muted-foreground">Estimated cost</span>
              <span className="font-heading text-lg font-semibold">
                Ksh {cost.toLocaleString()}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Recipient</dt>
              <dd>{watch("recipientName") || "—"}</dd>
              <dt className="text-muted-foreground">Phone</dt>
              <dd>{watch("recipientPhone") || "—"}</dd>
              <dt className="text-muted-foreground">Address</dt>
              <dd>
                {watch("address") || "—"}, {watch("city")}
              </dd>
              <dt className="text-muted-foreground">Weight</dt>
              <dd>{weight} kg</dd>
              <dt className="text-muted-foreground">Size</dt>
              <dd>{watch("dimensions")}</dd>
              <dt className="text-muted-foreground">Type</dt>
              <dd>{watch("type")}</dd>
            </dl>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
            className="gap-1.5"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={handleNext} className="gap-1.5">
              Next
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="gap-1.5">
              {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
              Confirm & pay
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
