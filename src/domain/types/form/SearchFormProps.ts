import { FormikHelpers } from "formik";
import { ReactNode } from "react";
import * as Yup from "yup";

export type OptionsTypes = "text" | "number" | "select" | "date";


export interface SearchOption {
  label: string;
  value: string | number;
}

export interface SearchFormFields<T extends object> {
  name: keyof T;
  label: string;
  type: OptionsTypes;
  placeholder?: string;
  options?: SearchOption[];
  disabled?: boolean;
  component?: ReactNode;

}

export interface SearchFormProps<T extends object> {
  fields: SearchFormFields<T>[];
  initialValues: T;
  validation?: Yup.ObjectSchema<Partial<T>>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
}
