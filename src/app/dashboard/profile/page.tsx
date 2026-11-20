import type { Metadata } from "next";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { UserModel } from "@/models/User";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await requireUser("/dashboard/profile");
  const record = await UserModel.findById(user.id).select("createdAt").lean();

  const details = [
    { label: "Naam", value: user.name },
    { label: "Email", value: user.email },
    { label: "Login", value: "Google account se" },
    ...(record?.createdAt ? [{ label: "Member since", value: formatDate(record.createdAt) }] : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="heading-3">Profile</h1>
        <p className="body-3 mt-2 max-w-170 text-muted">Yeh jaankari aapke Google account se aati hai.</p>
      </header>

      <dl className="flex max-w-md flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
        {details.map((detail) => (
          <div key={detail.label} className="flex flex-col gap-1">
            <dt className="caption-1 text-muted">{detail.label}</dt>
            <dd className="body-2 break-words">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <p className="body-6 max-w-170 text-muted">
        Apna account ya data hatwana chahte hain? Hume{" "}
        <Link
          href="/contact"
          className="rounded-lg underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          contact
        </Link>{" "}
        karein.
      </p>

      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
