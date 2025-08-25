"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, redirectTo = '/' }) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Protect the route - redirect to home if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(redirectTo);
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  if (!isSignedIn) {
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
