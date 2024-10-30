import { User } from "@/types"

interface IProfileProps {
  user?: User
}

export default function Profile({ user }: IProfileProps) {
  return <div>halo {JSON.stringify(user)}</div>
}
