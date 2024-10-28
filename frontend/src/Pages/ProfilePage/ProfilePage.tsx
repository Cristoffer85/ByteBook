import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'

type Props = {}

const ProfilePage = (props: Props) => {
    return (
        <div className="w-full relative flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 p-4 ml-64 overflow-y-auto">
            <h1 className="text-2xl">ByteBook ProfilePage</h1>
          </div>
        </div>
      )
}

export default ProfilePage