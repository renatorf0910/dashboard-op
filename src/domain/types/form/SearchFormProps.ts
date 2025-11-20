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

export interface SearchFormDrawerProps<T extends object> {
  title?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: SearchFormFields<T>[];
  initialValues: Partial<T>;
  validation?: Yup.ObjectSchema<Partial<T>>;
  onSubmit: (values: Partial<T>, helpers: FormikHelpers<Partial<T>>) => void;
  onClear?: () => void;
}

export interface SearchFormProps<T extends object> {
  fields: SearchFormFields<T>[];
  initialValues: Partial<T>;
  validation?: Yup.ObjectSchema<Partial<T>>;
  onSubmit: (values: Partial<T>, helpers: FormikHelpers<Partial<T>>) => void | Promise<void>;
  onClear?: () => void;
}
