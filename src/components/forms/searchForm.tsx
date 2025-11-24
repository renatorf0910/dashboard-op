"use client";

import { SearchFormProps } from "@/domain/types/form/SearchFormProps";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

import { addFilter, deleteFilter, getFilters } from "@/application/services/filters-api";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useFilterStore } from "@/application/store/useFilterStore";
import { usePathname } from "next/navigation";
import { Filters, SavedFilter } from "@/domain/types/filters/FIlterProps";
import { toast } from "sonner";

const filterNameSchema = Yup.string()
  .required("Filter name is required")
  .max(50, "Max 50 characters");

export function SearchForm<T extends object>({
  fields,
  initialValues,
  validation,
  onSubmit,
  onClear,
  filtersApplied,
}: SearchFormProps<T>) {
  const pathname = usePathname();
  const { filters, setFilters, clearFilters, hasFilters } = useFilterStore();
  const pageFilters = filters[pathname] || {};
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedFilters, setSavedFilters] = useState<SavedFilter<Partial<T>>[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterError, setFilterError] = useState<string | null>(null);
  const [selectedFilterId, setSelectedFilterId] = useState<number | null>(null);

  useEffect(() => {
    refreshFilters();
  }, []);

  const toFilters = (values: Partial<T>): Filters => {
    const result: Filters = {};
    Object.entries(values).forEach(([k, v]) => {
      if (
        v === undefined ||
        v === null ||
        typeof v === "string" ||
        typeof v === "number"
      ) {
        result[k] = v;
      } else {
        result[k] = JSON.stringify(v);
      }
    });
    return result;
  };

  const refreshFilters = async () => {
    const list = await getFilters<Partial<T>>();
    setSavedFilters(list);
  };

  const handleSaveFilter = async (values: Partial<T>) => {
    try {
      await filterNameSchema.validate(filterName);
      await addFilter({ name: filterName, values, page: pathname });
      toast.success("Filter saved successfully!");
      setFilterName("");
      setOpenDialog(false);
      setFilterError(null);
      await refreshFilters();
    } catch (err: any) {
      setFilterError(err.message);
      toast.error(err.message || "Failed to save filter");
    }
  };

  const handleDeleteFilter = async () => {
    if (!selectedFilterId) {
      setFilterError("Select a filter to delete.");
      toast.error("Select a filter to delete.");
      return;
    }
    try {
      await deleteFilter(selectedFilterId);
      toast.success("Filter deleted successfully!");
      setSelectedFilterId(null);
      await refreshFilters();
    } catch (err: any) {
      setFilterError(err.message);
      toast.error(err.message || "Failed to delete filter");
    }
  };

  return (
    <Formik<Partial<T>>
      initialValues={{ ...initialValues, ...pageFilters }}
      validationSchema={validation}
      enableReinitialize
      onSubmit={async (values, helpers) => {
        setSubmitError(null);
        try {
          setFilters(pathname, toFilters(values));
          await onSubmit(values, helpers);
        } catch (err: any) {
          setSubmitError(err.message || "Something went wrong.");
        }
        helpers.setSubmitting(false);
      }}
    >
      {({ resetForm, setValues, values }) => (
        <Form className="flex flex-col gap-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Saved filters</label>
            <select
              className={clsx(
                "border rounded-lg px-3 py-2 dark:border-zinc-700",
                !savedFilters.length ? "border-red-500" : ""
              )}
              value={selectedFilterId || ""}
              onChange={(e) => {
                const id = Number(e.target.value);
                setSelectedFilterId(id || null);
                const filter = savedFilters.find(f => f.id === id && f.page === pathname);
                if (filter) setValues(filter.values);
              }}
            >
              <option value="">Choose a saved filter</option>
              {savedFilters
                .filter(f => f.page === pathname)
                .map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
            </select>

            {filterError && <p className="text-red-500 text-sm">{filterError}</p>}
          </div>
          <div className="flex gap-2 mt-2">
            <Button className="cursor-pointer" type="button" onClick={() => setOpenDialog(true)}>
              Save this filter bellow
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="cursor-pointer" type="button" variant="destructive">
                  Delete filter
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete filter</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the selected filter? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteFilter}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Separator />
          {fields.map(field => {
            const name = String(field.name);
            return (
              <div key={name} className="flex flex-col gap-2">
                <label htmlFor={name} className="font-medium">{field.label}</label>
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
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Field>
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
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
              </div>
            );
          })}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-end gap-3">
              <Button
                className="bg-primary hover:bg-primary-foreground text-primary-side-bar py-2 px-4 rounded-lg transition-all cursor-pointer"
              >
                Filter
              </Button>
              <Button
                type="button"
                disabled={!hasFilters(pathname) && !filtersApplied}
                onClick={() => {
                  clearFilters(pathname);
                  resetForm();
                  onClear?.();
                }}
                className={clsx(
                  "bg-primary hover:bg-primary-foreground text-primary-side-bar px-4 rounded-lg transition-all cursor-pointer",
                  (!hasFilters(pathname) && !filtersApplied) && "opacity-50 cursor-not-allowed"
                )}
              >
                Reset Filters
              </Button>
            </div>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="space-y-4">
              <DialogHeader>
                <DialogTitle>Save this filter</DialogTitle>
              </DialogHeader>
              <Textarea
                placeholder="Filter name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="w-full"
              />
              {filterError && <p className="text-red-500 text-sm">{filterError}</p>}
              <DialogFooter>
                <Button className="w-full cursor-pointer" onClick={() => handleSaveFilter(values)}>
                  Save Filter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {submitError && (
            <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded-lg mt-2">
              {submitError}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
