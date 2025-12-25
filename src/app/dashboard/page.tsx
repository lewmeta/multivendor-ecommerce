import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

const Dashboad = async () => {
  // Get user and redirect depending on role
  const user = await currentUser();

  console.log("User role:", user?.privateMetadata?.role, "User name: ", user?.firstName);
  if (!user?.privateMetadata?.role || user?.privateMetadata?.role === 'USER') {
    redirect('/');
  } else if (user?.privateMetadata?.role === 'SELLER') {
    redirect('/dashboard/vendor');
  } else if (user?.privateMetadata?.role === 'ADMIN') {
    redirect('/dashboard/admin');
  }
}

export default Dashboad