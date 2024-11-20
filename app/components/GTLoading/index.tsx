import React, { Fragment } from "react";

type GTLoadingProps = {
  children: React.ReactNode;
  loading: boolean;
  title: string;
};

const GTLoading = ({ children, loading, title }: GTLoadingProps) => {
  return loading ? (
    <div className="flex min-h-64 flex-col items-center justify-center gap-6">
      <div className="size-10 animate-spin rounded-full border-b-2 border-green-500" />
      {title}
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default GTLoading;
