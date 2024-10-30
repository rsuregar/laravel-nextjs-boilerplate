import { User } from "@/types"
import { FC } from "react"

interface IProfileProps {
  user?: User
}

const Profile: FC<IProfileProps> = ({ user }: IProfileProps) => {
  return <div>halo {JSON.stringify(user)}</div>
}

export default Profile
