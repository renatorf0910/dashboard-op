"use client";
import { useDetectIOS } from '@/application/hooks/useDetectIOS';

export default function DetectIOSWrapper() {
  useDetectIOS();
  return null;
}