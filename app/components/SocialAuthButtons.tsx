import AppleIcon from "@/app/assets/icons/AppleIcon";
import GoogleIcon from "@/app/assets/icons/GoogleIcon";
import type { SocialAuthButtonsProps } from "@/app/utils/types";

const buttonClass =
  "flex items-center justify-center cursor-pointer gap-2 rounded-md border border-muted/50 py-2.5 text-sm text-light transition hover:bg-light/10";

export default function SocialAuthButtons({
  dividerText,
  onGoogleClick,
  onAppleClick,
}: SocialAuthButtonsProps) {
  return (
    <>
      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-field-border" />
        {dividerText}
        <span className="h-px flex-1 bg-field-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={onGoogleClick} className={buttonClass}>
          <GoogleIcon />
          Google
        </button>
        <button type="button" onClick={onAppleClick} className={buttonClass}>
          <AppleIcon />
          Apple
        </button>
      </div>
    </>
  );
}
