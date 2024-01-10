import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const LoginContainer = () => {
    const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one number and one special character'),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('https://mock-api.arikmpt.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to login.');
      }

      const data = await response.json();
      console.log('Login success:', data);
      window.sessionStorage.setItem("token", data.data.token);

      navigate('/home')

    } catch (error: any) {
        alert('Failed to login, please check your email and password are correct!')
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to right, #000000, #0000FF, #800080)' }}>
        <div className='mb-20'>
        <h1 className='text-4xl text-white'>Login first to access the Weather App!😊</h1>
        </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Do you already have an account?</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <Field type="email" id="email" name="email" className="w-full border rounded p-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <Field type="password" id="password" name="password" className="w-full border rounded p-2" />
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mt-6">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-96">Login</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginContainer;
