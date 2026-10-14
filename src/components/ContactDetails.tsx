import Image from "next/image";
import { profile } from "@/data/profile";

export function ContactDetails() {
  return (
    <div className="contact-layout">
      <div className="profile-caption">
        <p className="contact-label">이메일</p>
        <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
        <p className="contact-label">전화</p>
        <a className="text-link" href={`tel:${profile.phone.replace(/-/g, "")}`}>{profile.phone}</a>
      </div>
      <a className="profile-contact-qr" href="/contact.vcf" download>
        <Image src="/contact-qr.png" alt="권태형 연락처 저장용 QR 코드" width={120} height={120} loading="eager" />
        <span>연락처 QR</span>
      </a>
    </div>
  );
}
