"use client";
import { SearchFormProps } from "@/domain/types/form/SearchFormProps";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

export function SearchForm<T extends object>({
  fields,
  initialValues,
  validation,
  onSubmit,
}: SearchFormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values, helpers) => {
        await onSubmit(values, helpers);
        helpers.setSubmitting(false);
      }}
    >
      {({ handleSubmit, resetForm }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md"
        >
          {fields.map((field) => (
            <div key={String(field.name)} className="flex flex-col gap-2">
              <label htmlFor={String(field.name)} className="font-medium">
                {field.label}
              </label>

              {field.type === "select" && field.options ? (
                <Field
                  as="select"
                  id={String(field.name)}
                  name={String(field.name)}
                  disabled={field.disabled}
                  className="border rounded-lg px-3 py-2 bg-transparent"
                >
                  <option value="">Choose...</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Field>
              ) : field.type === "date" ? (
                <Field
                  id={String(field.name)}
                  name={String(field.name)}
                  type="date"
                  disabled={field.disabled}
                  className="border rounded-lg px-3 py-2 bg-transparent"
                />
              ) : (
                <Field
                  id={String(field.name)}
                  name={String(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  className="border rounded-lg px-3 py-2 bg-transparent"
                />
              )}

              <ErrorMessage
                name={String(field.name)}
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
            >
              Filter
            </button>

            <button
              type="button"
              onClick={() => resetForm()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
