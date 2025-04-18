import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email:    { label: 'Email',    type: 'text'     },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, email: user.email };
        }
        return null;
      }
    })
  ],

  // **ADD THIS** to point at your login page
  pages: {
    signIn: '/admin/login'
  },

  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  }
});
