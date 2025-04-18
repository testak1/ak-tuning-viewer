import { getCsrfToken } from 'next-auth/react';

export default function Login({ csrfToken }) {
  return (
    <form
      method="post"
      action="/api/auth/callback/credentials"
    >
      <input name="csrfToken"   type="hidden" defaultValue={csrfToken} />
      {/* tell NextAuth where to go after login: */}
      <input name="callbackUrl" type="hidden" defaultValue="/admin/makes" />

      <label>
        Email:
        <input name="email" type="email" required />
      </label>

      <label>
        Password:
        <input name="password" type="password" required />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
