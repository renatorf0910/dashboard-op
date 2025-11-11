"use client";

import React from "react";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { SearchForm } from "@/components/forms/searchForm";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";

interface SearchFormDrawerProps<T extends object> {
  title?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: SearchFormFields<T>[];
  initialValues: T;
  validation?: Yup.ObjectSchema<Partial<T>>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void | Promise<void>;
}

export function SearchFormDrawer<T extends object>({
  title = "Filters",
  open,
  onOpenChange,
  fields,
  initialValues,
  validation,
  onSubmit,
}: SearchFormDrawerProps<T>) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-6 sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold mb-2">
            {title}
          </DrawerTitle>
        </DrawerHeader>

        <div className="mt-2">
          <SearchForm<T>
            fields={fields}
            initialValues={initialValues}
            validation={validation}
            onSubmit={async (values, helpers) => {
              await onSubmit(values, helpers);
              onOpenChange(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
