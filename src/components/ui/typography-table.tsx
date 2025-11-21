export function TypographyNameColumn({name}: {name: string}) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              {name}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
