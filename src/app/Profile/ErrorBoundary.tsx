"use client";

import { Component, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ProfileErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Profile Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white font-IranSans">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-[#101117] mb-4">
              خطایی رخ داد
            </h1>
            <p className="text-[#55565A] mb-6">
              متأسفانه مشکلی در بارگذاری صفحه پروفایل به وجود آمده است.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/Profile';
              }}
              className="bg-[#416CEA] text-white px-6 py-3 rounded-3xl"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

