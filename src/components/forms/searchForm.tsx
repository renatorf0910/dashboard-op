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
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
            >
              Filter
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                onClear?.();
              }}
              className="bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
