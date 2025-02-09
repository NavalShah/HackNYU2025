// pages/dashboard.tsx
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={() => router.push('/profile')}>Edit Profile</button>
    </div>
  );
}