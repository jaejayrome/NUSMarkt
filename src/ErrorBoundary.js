import React from 'react';

const withErrorBoundary = (WrappedComponent) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state to indicate an error has occurred
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can log the error or perform any other error handling here
      console.error(error);
    }

    render() {
      if (this.state.hasError) {
        // You can render a fallback UI or an error message here
        return <h1>Something went wrong.</h1>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};
