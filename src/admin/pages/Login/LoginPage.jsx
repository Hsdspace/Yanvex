import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';

const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    await login(values);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(115,115,115,0.12),transparent_26%),var(--bg)] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Admin portal</p>
          <h1 className="text-3xl font-semibold text-white">Sign in to your account</h1>
          <p className="text-slate-400">Secure access to YANVEX intelligence and management tools.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="admin@yanvex.ai"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-center text-sm text-slate-400">
          Use any admin credentials connected to <span className="text-slate-200">/api/auth</span>.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
