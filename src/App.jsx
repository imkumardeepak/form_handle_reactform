import { useForm } from 'react-hook-form';
import { useState,useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import NProgress styles
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // Enable dark mode by default
  }, []);
  // Initialize the useForm hook
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // State to track the API response
  const [response, setResponse] = useState(null);

  // Function to handle form submission
  const onSubmit = async (data) => {
    NProgress.start(); // Start the loading bar
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponse(result);
      toast.success('Form submitted successfully!'); // Show success toast
      reset(); // Reset the form after successful submission
    } catch (error) {
      toast.error('There was an error submitting the form.'); // Show error toast
      console.error('Error:', error);
    } finally {
      NProgress.done(); // Stop the loading bar
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="dark" /> {/* ToastContainer */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl drop-shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...register('email', { 
                required: 'Email is required', 
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' }
              })}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        {/* Display API response */}
        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800">API Response:</h3>
            <pre className="text-gray-600">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
