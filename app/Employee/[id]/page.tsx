export default async function EmployeePage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Employee Details</h1>
      <p className="mt-4 text-lg">Viewing details for employee ID: {id}</p>
    </div>
  );
}
