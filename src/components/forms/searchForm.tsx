"use client";

import { SearchFormProps } from "@/domain/types/form/SearchFormProps";
import { ErrorMessage, Field, Form, Formik } from "formik";
import clsx from "clsx";

export function SearchForm<T extends object>({
  fields,
  initialValues,
  validation,
  onSubmit,
  onClear,
  filtersApplied,
}: SearchFormProps<T>) {
  return (
    <Formik<Partial<T>>
      initialValues={initialValues}
      validationSchema={validation}
      enableReinitialize
      onSubmit={async (values, helpers) => {
        await onSubmit(values, helpers);
        helpers.setSubmitting(false);
      }}
    >
      {({ handleSubmit, resetForm }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md"
        >
          {fields.map((field) => {
            const name = String(field.name);

            return (
              <div key={name} className="flex flex-col gap-2">
                <label htmlFor={name} className="font-medium">
                  {field.label}
                </label>
                {field.type === "select" && field.options ? (
                  <Field
                    as="select"
                    id={name}
                    name={name}
                    disabled={field.disabled}
                    className={clsx(
                      "border rounded-lg px-3 py-2 bg-transparent focus:ring-2",
                      "focus:ring-blue-500 dark:border-zinc-700"
                    )}
                  >
                    <option value="">Choose...</option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
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
              className="bg-primary hover:bg-primary-foreground text-primary-side-bar py-2 px-4 rounded-lg transition-all"
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
                "bg-primary hover:bg-primary-foreground text-primary-side-bar px-4 rounded-lg transition-all",
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
