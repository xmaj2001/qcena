import { Button, Card } from "@heroui/react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Card className="flex flex-col items-center justify-between">
        <Image
          src="/user-avatar.png"
          alt="User Avatar"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-bold">User Name</h1>
        <p className="text-gray-600">User Email</p>
        <Button variant="outline">Edit Profile</Button>
      </Card>
    </main>
  );
}
