import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-active={isActive}
      className={cn("pagination-link",
        `
        inline-flex items-center justify-center 
        h-8 min-w-8 px-3 rounded-md text-sm font-medium
        transition-all cursor-pointer
        bg-primary 
        text-primary-white
        border border-primary
        hover:bg-primary/90
        data-[active=true]:bg-white
        data-[active=true]:text-primary-white
        data-[active=true]:border-primary
        data-[active=true]:font-semibold
      `,
        className
      )}
      {...props}
    />
  );
}


function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn(
        `
        px-2
        text-foreground/60 
        hover:text-primary
      `,
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:block ml-1">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn(
        `
        px-2
        text-foreground/60 
        hover:text-primary
      `,
        className
      )}
      {...props}
    >
      <span className="hidden sm:block mr-1">Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center h-8 px-2 text-muted-foreground",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  );
}

export {
  Pagination,
  PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
};

