"use client";

import { Component } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "@/domain/types/error/ErrorBoundaryProps";
import { ErrorFallback } from "./errorFallback";

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private resetState = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorFallback
            error={this.state.error}
            onRetry={this.resetState}
          />
        )
      );
    }

    return this.props.children;
  }
}
