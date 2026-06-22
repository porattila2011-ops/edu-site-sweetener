import {
  Award,
  Leaf,
  PawPrint,
  Smile,
  Trophy,
  Sprout,
  Star,
  Heart,
  Sun,
  BookOpen,
  Users,
  Target,
  Building2,
  Medal,
  type LucideIcon,
} from "lucide-react";

export const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  Award,
  Medal,
  Trophy,
  Leaf,
  Sprout,
  PawPrint,
  Smile,
  Star,
  Heart,
  Sun,
  BookOpen,
  Users,
  Target,
  Building2,
};

export const ACHIEVEMENT_ICON_NAMES = Object.keys(ACHIEVEMENT_ICONS);

export function getAchievementIcon(name: string): LucideIcon {
  return ACHIEVEMENT_ICONS[name] ?? Award;
}
