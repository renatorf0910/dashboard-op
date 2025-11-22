"use client";

import { useFilterDrawerStore } from "@/application/store/useFilterDrawerStore";
import { SearchForm } from "@/components/forms/searchForm";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SearchFormDrawerProps } from "@/domain/types/form/SearchFormProps";

export function SearchFormDrawer<T extends object>({
  title = "Filters",
  fields,
  initialValues,
  validation,
  onSubmit,
  onClear,
  filtersApplied,
}: SearchFormDrawerProps<T>) {
  const { isOpen, close } = useFilterDrawerStore();

  return (
    <Drawer open={isOpen} onOpenChange={(o) => (!o ? close() : null)}>
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
            filtersApplied={filtersApplied}
            onSubmit={(values, helpers) => {
              onSubmit(values, helpers);
              close();
            }}
            onClear={onClear}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
