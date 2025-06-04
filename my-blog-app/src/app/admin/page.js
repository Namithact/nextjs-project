import Logout from "@/components/Logout";
import AddBlogForm from '@/components/AddBlogForm'
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/config";


export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.isAdmin) {
    return <div>Access Denied</div>;
  }

  return (
  <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
   <Logout/>
  </div>

  <p className="mb-6 text-gray-600">Welcome, <span className="font-semibold">{session.user.email}</span></p>
  
  <div className="mb-8">
    <AddBlogForm />
  </div>
</div>


  );
}
