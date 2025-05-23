import { GetServerSidePropsContext } from "next";

type Props = {
  params: {
    id: string;
  };
};

export default async function EmployeePage({ params }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Employee Details</h1>
      <p className="mt-4 text-lg">Viewing details for employee ID: {params.id}</p>
    </div>
  );
}
