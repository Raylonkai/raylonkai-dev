import { Link } from 'wouter';

export default function NotFound() {
  return (
    <>
      <h1>404 — Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link href="/">Return home</Link>
    </>
  );
}
