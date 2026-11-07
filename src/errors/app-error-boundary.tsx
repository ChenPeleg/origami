import React, { Component, type ErrorInfo } from 'react';
import { ErrorBoundaryPage } from './error-boundary-page.tsx';

export interface ErrorProps {
    children: React.ReactNode;
    fallBackComponent?: React.ReactNode;
}

export interface ErrorState {
    hasError: boolean;
}

export class AppErrorBoundary extends Component<ErrorProps, ErrorState> {
    constructor(props: ErrorProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallBackComponent || (
                    <ErrorBoundaryPage></ErrorBoundaryPage>
                )
            );
        }

        return this.props.children;
    }
}
