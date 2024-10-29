import { useAuth } from "@/hooks/use-auth"

export default function LogoutButton() {
  const { logout } = useAuth()

  return <button onClick={logout}>Logout</button>
}
