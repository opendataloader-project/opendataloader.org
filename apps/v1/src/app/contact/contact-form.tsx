"use client";

import type { ComponentProps, FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { track } from "@/lib/tracking";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const readField = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value.trim() : "";
    };

    const payload = {
      firstName: readField("firstName"),
      lastName: readField("lastName"),
      businessEmail: readField("businessEmail"),
      jobTitle: readField("jobTitle"),
      company: readField("company"),
      details: readField("details"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const errorMessage =
          typeof errorPayload?.error === "string"
            ? errorPayload.error
            : "Failed to send your message. Please try again.";
        throw new Error(errorMessage);
      }

      setStatus("success");
      setMessage("Thanks! Your message has been sent.");
      form.reset();
    } catch (error) {
      console.error("Contact form submission error", error);
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setStatus((current) => (current === "submitting" ? "idle" : current));
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg gap-16">
        <CardHeader>
          <CardTitle className="text-2xl">Tell us about your project</CardTitle>
          <CardDescription>
            We respond within two business days. Provide enough context so our
            solutions team can prepare resources ahead of time.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldSet className="space-y-4">
            <FieldLegend className="sr-only">Contact information</FieldLegend>

            <FieldGroup className="grid gap-6 sm:grid-cols-2">
              <InputField
                id="firstName"
                label="First Name"
                autoComplete="given-name"
                required
              />
              <InputField
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                required
              />
            </FieldGroup>

            <InputField
              id="businessEmail"
              label="Business Email Address"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
            />

            <FieldGroup className="grid gap-6 sm:grid-cols-2">
              <InputField
                id="jobTitle"
                label="Job Title"
                autoComplete="organization-title"
              />
              <InputField
                id="company"
                label="Company / Institution"
                autoComplete="organization"
              />
            </FieldGroup>

            <TextareaField
              id="details"
              label="Details"
              placeholder="Please share your goals, current workflow, or any questions we can help with."
              required
              rows={6}
              description="The more context you provide, the faster we can help."
            />
          </FieldSet>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              <span>Please see our</span>{" "}
              <Link
                href="https://accounts.hancom.com/policy/privacy/current/en"
                className="text-primary underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              <span>regarding how we will handle this information.</span>
            </p>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
              onClick={() => track("submit_contact", { from: "contact" })}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>

          {message ? (
            <Alert
              variant={status === "error" ? "destructive" : "default"}
              className={
                status === "error"
                  ? "border-destructive/40 bg-destructive/5"
                  : "border-primary/30 bg-primary/5"
              }
            >
              {status === "error" ? (
                <AlertCircle className="text-destructive" />
              ) : (
                <CheckCircle2 className="text-primary" />
              )}
              <AlertTitle>
                {status === "error" ? "Submission failed" : "Message sent"}
              </AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
}
type InputFieldProps = {
  label: string;
  description?: string;
} & ComponentProps<typeof Input>;

function InputField({
  id,
  label,
  required,
  description,
  ...props
}: InputFieldProps) {
  if (!id) throw new Error("InputField requires an id.");

  return (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </FieldLabel>

      <FieldContent>
        <Input
          id={id}
          name={props.name ?? id}
          required={required}
          aria-required={required}
          {...props}
        />
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </FieldContent>
    </Field>
  );
}

type TextareaFieldProps = {
  label: string;
  description?: string;
} & ComponentProps<typeof Textarea>;

function TextareaField({
  id,
  label,
  required,
  description,
  ...props
}: TextareaFieldProps) {
  if (!id) throw new Error("TextareaField requires an id.");

  return (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </FieldLabel>

      <FieldContent>
        <Textarea
          id={id}
          name={props.name ?? id}
          required={required}
          aria-required={required}
          {...props}
        />
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </FieldContent>
    </Field>
  );
}
