import React from "react";

export interface IModal {
  children: React.ReactNode;
  onClose: () => void;
  onOpen?: boolean;
  className?: string;
}