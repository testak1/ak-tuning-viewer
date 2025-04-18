import { useSession } from 'next-auth/react';
import CrudTable from '../../components/CrudTable';

export default function AdminMakes() {
  const { data: session } = useSession();
  if (!session) return <p>Please log in.</p>;
  return <CrudTable resource="makes" columns={['name']} />;
}
