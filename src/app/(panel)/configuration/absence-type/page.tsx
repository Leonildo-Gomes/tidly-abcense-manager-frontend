import AbsenceTypeList from "./_components/absence-type-list";

export default function AbsenceTypePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-serif font-bold text-foreground">
          Absence Types
        </h1>
        <p className="text-muted-foreground">
          Manage the different types of absences available for employees.
        </p>
      </div>

      <AbsenceTypeList />
    </div>
  );
}