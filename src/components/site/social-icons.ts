import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type { SocialKey } from "@/content/site";

export const socialIcons: Record<SocialKey, IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
};
