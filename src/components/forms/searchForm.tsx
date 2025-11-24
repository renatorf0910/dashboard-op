"use client";

import { SearchFormProps } from "@/domain/types/form/SearchFormProps";
import { ErrorMessage, Field, Form, Formik } from "formik";
import clsx from "clsx";
import { useState } from "react";

export function SearchForm<T extends object>({
  fields,
  initialValues,
  validation,
  onSubmit,
  onClear,
  filtersApplied,
}: SearchFormProps<T>) {

  const [submitError, setSubmitError] = useState<string | null>(null);

  return (
    <Formik<Partial<T>>
      initialValues={initialValues}
      validationSchema={validation}
      enableReinitialize
      onSubmit={async (values, helpers) => {
        setSubmitError(null);

        try {
          await onSubmit(values, helpers);
        } catch (err: any) {
          setSubmitError(err.message || "Something went wrong.");
        }

        helpers.setSubmitting(false);
      }}
    >
      {({ handleSubmit, resetForm }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md"
        >
          {submitError && (
            <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded-lg">
              {submitError}
            </div>
          )}
          {fields.map((field) => {
            const name = String(field.name);

            return (
              <div key={name} className="flex flex-col gap-2">
                <label htmlFor={name} className="font-medium">
                  {field.label}
                </label>
                {field.type === "select" && field.options ? (
                  <div className="relative">
                    <Field
                      as="select"
                      id={name}
                      name={name}
                      disabled={field.disabled}
                      className={clsx(
                        "appearance-none border rounded-lg w-full px-3 pr-10 py-2",
                        "bg-transparent dark:border-zinc-700",
                        "focus:ring-2 focus:ring-blue-500"
                      )}
                    >
                      <option value="">Choose...</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Field>
                    <svg
                      className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                ) : (
                  <Field
                    id={name}
                    name={name}
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    className={clsx(
                      "border rounded-lg px-3 py-2 bg-transparent",
                      "focus:ring-2 focus:ring-blue-500 dark:border-zinc-700"
                    )}
                  />
                )}

                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            );
          })}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-foreground text-primary-side-bar py-2 px-4 rounded-lg transition-all cursor-pointer"
            >
              Filter
            </button>

            <button
              type="button"
              disabled={!filtersApplied}
              onClick={() => {
                resetForm();
                onClear?.();
              }}
              className={clsx(
                "bg-primary hover:bg-primary-foreground text-primary-side-bar px-4 rounded-lg transition-all cursor-pointer",
                !filtersApplied && "opacity-50 cursor-not-allowed"
              )}
            >
              Reset Filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
